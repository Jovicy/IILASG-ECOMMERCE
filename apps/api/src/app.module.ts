import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './auth/config/jwt.config';
import refreshConfig from './auth/config/refresh.config';
import { TokenGuard } from './common/guard/token/token.guard';
import { TokenStrategy } from './common/strategy/token.strategy';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, refreshConfig],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TokenStrategy,
    {
      provide: 'APP_GUARD',
      useClass: TokenGuard,
    },
  ],
})
export class AppModule {}
