import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs('jwt', (): JwtModuleOptions => {
  const secret = process.env.JWT_SECRET;
  const expiresInEnv = process.env.JWT_EXPIRES_IN;
  return {
    secret: secret as string,
    signOptions: {
      expiresIn: expiresInEnv as string | number | undefined,
    },
  };
});
