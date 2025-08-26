import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { UserService } from 'src/user/user.service';
import { ConfigType } from '@nestjs/config';
import refreshConfig from './config/refresh.config';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { decrypt, encrypt } from 'src/common/utils/crypto.util';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { UserResponseDto } from 'src/common/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    @Inject(refreshConfig.KEY)
    private readonly refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {}

  async registerUser(
    userDetails: CreateUserDto,
  ): Promise<UserResponseDto | null> {
    const user = await this.userService.create({ ...userDetails });
    return new UserResponseDto(user);
  }

  async validateLocalUser(
    email: string,
    password: string,
  ): Promise<UserResponseDto | null> {
    const existingUser = await this.userService.findByEmail(email);

    if (!existingUser) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await verify(existingUser.password, password);

    if (!isPasswordValid) return null;

    return new UserResponseDto(existingUser);
  }

  async validateUserById(userId: string): Promise<UserResponseDto> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return new UserResponseDto(user);
  }

  async generateToken(
    userId: string,
    role: string,
    email: string,
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    if (!userId) return null;

    const payload = { sub: userId, email: email, role: role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    const encryptedRefreshToken = await encrypt(refreshToken);
    if (!encryptedRefreshToken) return null;

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    await this.prisma.refreshTokenSession.upsert({
      where: { userId },
      update: {
        refreshTokenId: encryptedRefreshToken,
        revoked: false,
        expiresAt,
        createdAt: new Date(),
      },
      create: {
        userId,
        refreshTokenId: encryptedRefreshToken,
        revoked: false,
        expiresAt,
      },
    });

    return { accessToken, refreshToken };
  }

  async findRefreshTokenSession(userId: string) {
    const refreshToken = await this.prisma.refreshTokenSession.findUnique({
      where: { userId },
    });

    if (refreshToken) {
      const decryptedRefreshToken = await decrypt(refreshToken.refreshTokenId);

      return {
        ...refreshToken,
        refreshTokenId: decryptedRefreshToken,
      };
    }

    return null;
  }

  async validateRefreshToken(userId: string) {
    return this.validateUserById(userId);
  }
}
