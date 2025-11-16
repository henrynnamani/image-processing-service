import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3: S3Client;
  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: configService.get('s3.region'),
      credentials: {
        accessKeyId: configService.get('s3.access.id')!,
        secretAccessKey: configService.get('s3.access.key')!,
      },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const bucket = this.configService.get('s3.bucket');

    const key = `uploads/${Date.now()}-${file.originalname}`;

    const upload = await this.s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return {
      url: `https://${bucket}.s3.${this.configService.get('s3.region')}.amazonaws.com/${key}`,
    };
  }
}
