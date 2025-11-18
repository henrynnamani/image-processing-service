import { Injectable, RequestTimeoutException } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { ITransform } from '@/shared/types/transform';
import sharp from 'sharp';

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

    const key = `uploads/${Date.now()}-${file?.originalname}`;

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
      key,
    };
  }

  async transformImage(key: string, filter: ITransform) {
    const { transformations } = filter;
    try {
      const bucket = this.configService.get('s3.bucket');

      const originalImage = await this.s3.send(
        new GetObjectCommand({ Bucket: bucket, Key: key }),
      );

      const body = await originalImage.Body?.transformToByteArray();

      let image = sharp(body);

      if (transformations?.resize) {
        image = image.resize(
          transformations.resize.width,
          transformations.resize.height,
        );
      }

      if (transformations?.crop) {
        image = image.extract({
          width: transformations.crop.width!,
          height: transformations.crop.height!,
          left: transformations.crop.x!,
          top: transformations.crop.y!,
        });
      }

      if (transformations?.rotate) {
        image = image.rotate(transformations.rotate);
      }

      if (transformations?.filters?.grayscale) {
        image = image.grayscale();
      }

      if (transformations?.filters?.sepia) {
        image = image.tint({ r: 112, g: 66, b: 20 });
      }

      if (transformations?.format) {
        image = image.toFormat(
          transformations.format as
            | keyof sharp.FormatEnum
            | sharp.AvailableFormatInfo,
        );
      }

      const buffer = await image.toBuffer();

      await this.s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: buffer,
          ContentType: `image/${transformations?.format} || 'jpeg'`,
        }),
      );

      return {
        url: `https://${bucket}.s3.${this.configService.get('s3.region')}.amazonaws.com/${key}`,
      };
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }
}
