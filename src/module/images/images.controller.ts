import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './provider/images.service';
import { ImageTransformDto } from './dto/transform.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.imagesService.uploadImage(file);
  }

  @Post(':id/transform')
  transformImage(
    @Param('id') id: string,
    transformImageDto: ImageTransformDto,
  ) {
    return this.imagesService.transformImage(id, transformImageDto);
  }

  @Get(':id')
  retrieveImage() {}

  @Get('')
  getAllImage() {}
}
