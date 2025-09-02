import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { UserService } from 'src/user/user.service';
import { OAuth2Client } from 'google-auth-library';
import { ConfigType } from '@nestjs/config';
import refreshConfig from './config/refresh.config';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { decrypt, encrypt } from 'src/common/utils/crypto.util';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { UserResponseDto } from 'src/common/dto/user-response.dto';
import { Role } from 'generated/prisma';

@Injectable()
export class AuthService {
  private client: OAuth2Client;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,

    @Inject(refreshConfig.KEY)
    private readonly refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

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

  async verifyGoogleToken({ token, role }: { token: string; role: Role }) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (payload?.email) {
        const existingUser = await this.userService.findByEmail(payload.email);

        if (existingUser) {
          if (existingUser.authProvider !== 'GOOGLE') {
            throw new UnauthorizedException(
              'This email is registered with password login. Please use email and password.',
            );
          }

          const { id, email, role } = existingUser;
          const token = await this.generateToken(id, role, email);

          return {
            role: role,
            accessToken: token?.accessToken,
            refreshToken: token?.refreshToken,
          };
        } else {
          if (payload?.given_name && payload?.family_name) {
            const newUser = await this.userService.create(
              {
                firstName: payload.given_name,
                lastName: payload.family_name,
                email: payload.email,
                password: `${payload.email}${token}`,
                role: role,
              },
              'GOOGLE',
            );

            if (newUser) {
              const { id, email, role } = newUser;
              const token = await this.generateToken(id, role, email);

              return {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: role,
                accessToken: token?.accessToken,
                refreshToken: token?.refreshToken,
              };
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid Google token');
    }
  }
}
