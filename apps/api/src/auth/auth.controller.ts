import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { LocalAuthGuard } from './guard/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guard/refresh-auth/refresh-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GoogleAuthGuard } from './guard/google-auth/google-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { UserResponseDto } from 'src/common/dto/user-response.dto';
import { LoginUserDto } from 'src/common/dto/login-user.dto';

@Public()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new vendor' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  async signupVendor(@Body() CreateUserDto: CreateUserDto) {
    const user = await this.authService.registerUser(CreateUserDto);

    if (user) {
      const { id, email, role } = user;
      const token = await this.authService.generateToken(id, email, role);

      return {
        accessToken: token?.accessToken,
        refreshToken: token?.refreshToken,
      };
    }

    return null;
  }

  /* User Login */
  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'User login (email & password)' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    schema: {
      example: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'StrongP@ssw0rd' },
      },
    },
  })
  async signinUser(
    @Request() req: { user: UserResponseDto },
  ): Promise<LoginUserDto> {
    const { id, email, role } = req.user;

    const token = await this.authService.generateToken(id, email, role);

    return {
      accessToken: token?.accessToken,
      refreshTokken: token?.refreshToken,
    };
  }

  /* Google Authentication */
  @Get('/google-signup')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Initiate Google OAuth flow' })
  @ApiResponse({
    status: 200,
    description: 'Returns user profile after successful authentication',
    schema: {
      example: {
        user: {
          email: 'user@example.com',
          first_name: 'John',
          last_name: 'Doe',
        },
        isNewUser: true,
      },
    },
  })
  async googleAuth() {
    // Redirect to Google OAuth page
  }

  /* Google Authentication Redirect */
  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  @ApiExcludeEndpoint()
  async googleAuthRedirect(
    @Request()
    req: {
      user: {
        email: string;
        firstName: string;
        lastName: string;
      };
    },
  ) {
    return {
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    };
  }

  /* Refresh Token */
  @Post('/refreshToken')
  @UseGuards(RefreshAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Access token refreshed successfully',
    schema: {
      example: {
        token: 'new-access-token-here',
        refreshToken: 'new-refresh-token-here',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized or invalid refresh token',
  })
  async refreshToken(@Request() req: { user: UserResponseDto }) {
    const { id, email, role } = req.user;

    const token = await this.authService.generateToken(id, email, role);

    return {
      token: token?.accessToken,
      refreshToken: token?.refreshToken,
    };
  }
}
