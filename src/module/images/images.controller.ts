import {
  Body,
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
import { CurrentUser } from '../auth/decorator/current-user.decorator';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser('id') loggedInUser,
  ) {
    return this.imagesService.uploadImage(file, loggedInUser);
  }

  @Post(':id/transform')
  transformImage(
    @Param('id') id: string,
    @Body() transformImageDto: ImageTransformDto,
  ) {
    return this.imagesService.transformImage(id, transformImageDto);
  }

  @Get(':id')
  retrieveImage(@Param('id') id: string) {
    return this.imagesService.retrieveImage(id);
  }

  @Get('')
  getAllImage() {
    return this.imagesService.getAllImage()
  }
}
