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
  async signupVendor(
    @Body() CreateUserDto: CreateUserDto,
  ): Promise<UserResponseDto | null> {
    return await this.authService.registerUser(CreateUserDto);
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
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        refresh_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        user: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          email: 'user@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'BUYER',
          verified: true,
          LGA: 'Ikeja',
          isLagosian: true,
          createdAt: '2023-12-01T10:00:00.000Z',
          updatedAt: '2023-12-01T10:00:00.000Z',
        },
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
      user: {
        ...req.user,
      },
      accessToken: token?.accessToken,
      refreshTokken: token?.refreshToken,
    };
  }

  /* Google Authentication */
  @Get('/google')
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
        isNewUser: boolean;
      };
    },
  ) {
    const path = req.user.isNewUser ? '/setup' : '/dashboard';
    return {
      email: req.user.email,
      first_name: req.user.firstName,
      last_name: req.user.lastName,
      path,
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

    console.log(req.user);
    const token = await this.authService.generateToken(id, email, role);

    return {
      token: token?.accessToken,
      refreshToken: token?.refreshToken,
    };
  }
}
