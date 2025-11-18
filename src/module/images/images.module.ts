import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './provider/images.service';
import { S3Module } from '../s3/s3.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './model/image.entity';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [S3Module, TypeOrmModule.forFeature([Image]), RedisModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
