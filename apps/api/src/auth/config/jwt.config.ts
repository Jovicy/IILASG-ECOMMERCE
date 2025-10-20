import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs('jwt', (): JwtModuleOptions => {
  const secret = process.env.JWT_SECRET as string;
  const expiresInEnv = process.env.JWT_EXPIRES_IN as string;
  return {
    secret,
    signOptions: {
      expiresIn: expiresInEnv,
    },
  };
});
