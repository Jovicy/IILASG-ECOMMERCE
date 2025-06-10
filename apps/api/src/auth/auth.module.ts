import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import refreshConfig from './config/refresh.config';
import { RefreshToken } from './strategy/refresh-token.strategy';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(refreshConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    LocalStrategy,
    RefreshToken,
  ],
})
export class AuthModule {}
