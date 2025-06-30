import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err: any, user: any) {
    if (err) throw err;

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return user;
  }
}
