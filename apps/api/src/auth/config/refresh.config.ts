import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export default registerAs('refresh-jwt', (): JwtSignOptions => {
  const expiresInEnv = process.env.REFRESH_JWT_EXPIRES_IN as string;

  return {
    secret: process.env.REFRESH_JWT_SECRET || '',
    expiresIn: expiresInEnv,
  };
});
