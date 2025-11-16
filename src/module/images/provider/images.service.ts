import { S3Service } from '@/module/s3/s3.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImagesService {
  constructor(private readonly s3Service: S3Service) {}

  async uploadImage(file) {
    return this.s3Service.uploadFile(file);
  }
}
