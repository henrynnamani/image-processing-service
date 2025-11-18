import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';
import { ImageTransformDto } from '../dto/transform.dto';

export class ImageUploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file to upload',
  })
  file: Express.Multer.File;
}

export const uploadImageDoc = () =>
  applyDecorators(
    ApiOperation({ summary: 'Upload image' }),
    ApiBearerAuth(),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      example: 'Image uploaded successfully',
    }),
    ApiResponse({
      status: 404,
      example: 'Image Not Found',
    }),
    ApiResponse({
      status: 400,
      example: 'Bad Request',
    }),
  );

export const transformImageDoc = () =>
  applyDecorators(
    ApiOperation({ summary: 'Transform image' }),
    ApiBearerAuth(),
    ApiBody({
      type: ImageTransformDto,
    }),
    ApiResponse({
      status: 200,
      example: 'Image transformed successfully',
    }),
    ApiResponse({
      status: 404,
      example: 'Image Not Found',
    }),
    ApiResponse({
      status: 400,
      example: 'Bad Request',
    }),
  );

export const retrieveImageDoc = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get Image' }),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      example: 'Image fetched successfully',
    }),
    ApiResponse({
      status: 404,
      example: 'Image Not Found',
    }),
    ApiResponse({
      status: 400,
      example: 'Bad Request',
    }),
  );

export const getAllImageDoc = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get all image' }),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      example: 'List of Images',
    }),
    ApiResponse({
      status: 404,
      example: 'Image Not Found',
    }),
    ApiResponse({
      status: 400,
      example: 'Bad Request',
    }),
  );
