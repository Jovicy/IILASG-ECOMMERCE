import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class TokenGuard extends AuthGuard('token') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Skip guard for public routes
    if (isPublic) return true;

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (
      info?.message === 'No auth token' ||
      info?.message === 'No auth token provided'
    ) {
      throw new UnauthorizedException('Token not provided');
    }

    if (info?.message === 'jwt expired') {
      throw new UnauthorizedException('Token expired');
    }

    if (info?.message === 'invalid token' || err || !user) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }
}
