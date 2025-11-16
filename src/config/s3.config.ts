import { registerAs } from '@nestjs/config';

export default registerAs('s3', () => ({
  region: process.env.AWS_REGION,
  access: {
    id: process.env.AWS_ACCESS_KEY_ID,
    key: process.env.AWS_SECRET_ACCESS_KEY,
  },
  bucket: process.env.AWS_S3_BUCKET,
}));
