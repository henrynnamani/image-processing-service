import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SkipAuth } from '../auth/decorator/skipAuth.decorator';
import { ImagesService } from './provider/images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.imagesService.uploadImage(file);
  }

  @Post(':id/transform')
  transformImage() {}

  @Get(':id')
  retrieveImage() {}

  @Get('')
  getAllImage() {}
}
