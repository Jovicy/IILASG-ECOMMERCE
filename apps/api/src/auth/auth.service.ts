import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import {
  UserDetails,
  UserDetailsWithTimestamps,
} from 'src/interface/user-details.interface';
import { UserService } from 'src/user/user.service';
import { ConfigType } from '@nestjs/config';
import refreshConfig from './config/refresh.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(refreshConfig.KEY)
    private readonly refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {}

  async registerUser(
    userDetails: UserDetails,
  ): Promise<UserDetailsWithTimestamps | null> {
    const { email } = userDetails;
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    if (userDetails.isLagosian) {
      if (!userDetails.state) {
        throw new BadRequestException(
          'Lagosian users must provide their state (e.g., "Victoria Island")',
        );
      }
    }

    const user = await this.userService.create(userDetails);
    return user;
  }

  async validateLocalUser(
    email: string,
    password: string,
  ): Promise<UserDetailsWithTimestamps> {
    const existingUser = await this.userService.findByEmail(email);

    if (!existingUser) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await verify(existingUser.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return existingUser;
  }

  async validateUserById(userId: string) {
    const user: UserDetailsWithTimestamps | null =
      await this.userService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async loginUser(userId: string) {
    const tokenData = await this.generateToken(userId);

    if (!tokenData) {
      throw new UnauthorizedException('Token generation failed.');
    }

    return tokenData;
  }

  async generateToken(
    userId: string,
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    if (!userId) {
      return null;
    }

    const payload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return { accessToken, refreshToken };
  }

  async validateRefreshToken(userId: string) {
    return this.validateUserById(userId);
  }
}
