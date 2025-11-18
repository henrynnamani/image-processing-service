import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './provider/images.service';
import { ImageTransformDto } from './dto/transform.dto';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { GetAllImageDto } from './dto/get-all.dto';
import { SkipThrottle } from '@nestjs/throttler';
import {
  getAllImageDoc,
  retrieveImageDoc,
  transformImageDoc,
  uploadImageDoc,
} from './docs/upload.doc';

@SkipThrottle()
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  @uploadImageDoc()
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser('id') loggedInUser,
  ) {
    return this.imagesService.uploadImage(file, loggedInUser);
  }

  @SkipThrottle({ default: false })
  @transformImageDoc()
  @Post(':id/transform')
  transformImage(
    @Param('id') id: string,
    @Body() transformImageDto: ImageTransformDto,
    @CurrentUser('id') loggedInUser,
  ) {
    return this.imagesService.transformImage(
      id,
      transformImageDto,
      loggedInUser,
    );
  }

  @retrieveImageDoc()
  @Get(':id')
  retrieveImage(@Param('id') id: string) {
    return this.imagesService.retrieveImage(id);
  }

  @getAllImageDoc()
  @Get('')
  getAllImage(@Query() allImageQueryDto: GetAllImageDto) {
    return this.imagesService.getAllImage(allImageQueryDto);
  }
}
