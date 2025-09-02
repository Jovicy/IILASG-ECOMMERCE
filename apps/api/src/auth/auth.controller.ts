import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { LocalAuthGuard } from './guard/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guard/refresh-auth/refresh-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { UserResponseDto } from 'src/common/dto/user-response.dto';
import { LoginUserDto } from 'src/common/dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { Role } from 'generated/prisma';

@Public()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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
      const token = await this.authService.generateToken(id, role, email);

      return {
        accessToken: token?.accessToken,
        refreshToken: token?.refreshToken,
      };
    }

    return null;
  }

  @Post('google')
  async googleAuth(@Body() body: { token: string; role: Role }) {
    const googleUser = await this.authService.verifyGoogleToken({
      token: body.token,
      role: body.role,
    });

    return googleUser;
  }

  /* User Login */
  @Post('signin')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'User login (email & password)' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    schema: {
      example: {
        role: 'vendor',
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

    const token = await this.authService.generateToken(id, role, email);

    return {
      role: role,
      accessToken: token?.accessToken,
      refreshToken: token?.refreshToken,
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

    const token = await this.authService.generateToken(id, role, email);

    return {
      token: token?.accessToken,
      refreshToken: token?.refreshToken,
    };
  }
}
