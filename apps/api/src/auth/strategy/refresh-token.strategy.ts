import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserDetailsWithTimestamps } from 'src/interface/user-details.interface';

@Injectable()
export class RefreshToken extends PassportStrategy(Strategy, 'refresh-token') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_JWT_SECRET!,
    });
  }

  async validate(payload: any): Promise<UserDetailsWithTimestamps> {
    const userId = payload.sub;

    const existingUser = await this.authService.validateRefreshToken(userId);

    return existingUser;
  }
}
