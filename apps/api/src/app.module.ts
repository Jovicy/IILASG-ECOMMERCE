import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './auth/config/jwt.config';
import refreshConfig from './auth/config/refresh.config';
import { TokenGuard } from './common/guard/token/token.guard';
import { TokenStrategy } from './common/strategy/token.strategy';
import { RolesGuard } from './common/guard/roles/roles.guard';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { VendorModule } from './vendor/vendor.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MulterModule.register({ dest: './uploads' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, refreshConfig],
    }),
    CategoryModule,
    ProductModule,
    VendorModule,
    PrismaModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TokenStrategy,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: TokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
