import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './provider/images.service';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [S3Module],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
