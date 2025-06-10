import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Role } from 'generated/prisma';
import { UserDetailsWithTimestamps } from 'src/interface/user-details.interface';
import { LocalAuthGuard } from './guard/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guard/refresh-auth/refresh-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new vendor' })
  @ApiResponse({ status: 201, description: 'Vendor registered successfully' })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  @Post('signup/vendor')
  async signupVendor(
    @Body() createVendor: CreateUserDto,
  ): Promise<UserDetailsWithTimestamps | null> {
    return await this.authService.registerUser({
      ...createVendor,
      role: Role.VENDOR,
    });
  }

  @ApiOperation({ summary: 'Register a new buyer' })
  @ApiResponse({ status: 201, description: 'Buyer registered successfully' })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  @Post('signup/buyer')
  async signupBuyer(
    @Body() createBuyer: CreateUserDto,
  ): Promise<UserDetailsWithTimestamps | null> {
    return await this.authService.registerUser({
      ...createBuyer,
      role: Role.BUYER,
    });
  }

  @ApiOperation({ summary: 'User login (email & password)' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    schema: {
      example: {
        user: {
          id: 'uuid',
          email: 'user@example.com',
          first_name: 'John',
          last_name: 'Doe',
          role: 'BUYER',
          isLagosian: true,
          state: 'Lagos',
          createdAt: '2024-06-10T12:00:00.000Z',
          updatedAt: '2024-06-10T12:00:00.000Z',
        },
        token: 'access-token',
        refreshToken: 'refresh-token',
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
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signinUser(@Request() req: { user: UserDetailsWithTimestamps }) {
    const { id } = req.user;

    const token = await this.authService.loginUser(id!);

    return {
      user: {
        ...req.user,
      },
      token: token?.accessToken,
      refreshToken: token?.refreshToken,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Access token refreshed successfully',
    schema: {
      example: {
        access: 'new-access-token-here',
        refreshToken: 'new-refresh-token-here',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized or invalid refresh token',
  })
  @UseGuards(RefreshAuthGuard)
  @Post('/refreshToken')
  async refreshToken(@Request() req: { user: UserDetailsWithTimestamps }) {
    const { id } = req.user;
    const token = await this.authService.loginUser(id!);

    return {
      access: token.accessToken,
      refreshToken: token.refreshToken,
    };
  }
}
