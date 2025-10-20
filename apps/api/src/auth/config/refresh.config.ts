import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export default registerAs('refresh-jwt', (): JwtSignOptions => {
  const expiresInEnv = process.env.REFRESH_JWT_EXPIRES_IN;

  return {
    secret: process.env.REFRESH_JWT_SECRET as string,
    expiresIn: expiresInEnv as string | number | undefined,
  };
});
