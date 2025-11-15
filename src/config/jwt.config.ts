import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  expires: {
    access: process.env.JWT_ACCESS_EXPIRES,
  },
}));
