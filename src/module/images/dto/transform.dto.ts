import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ResizeDto {
  @IsNumber()
  @IsOptional()
  width: number;

  @IsNumber()
  @IsOptional()
  height: number;
}

export class CropDto {
  @IsNumber()
  @IsOptional()
  width: number;

  @IsNumber()
  @IsOptional()
  height: number;

  @IsNumber()
  @IsOptional()
  x: number;

  @IsNumber()
  @IsOptional()
  y: number;
}

export class FilterDto {
  @IsBoolean()
  @IsOptional()
  grayscale: boolean;

  @IsBoolean()
  @IsOptional()
  sepia: boolean;
}

export class TransformationDto {
  @ValidateNested()
  @Type(() => ResizeDto)
  @IsOptional()
  resize?: ResizeDto;

  @ValidateNested()
  @Type(() => CropDto)
  @IsOptional()
  crop?: CropDto;

  @IsNumber()
  @IsOptional()
  rotate?: number;

  @IsString()
  @IsOptional()
  format?: string;

  @ValidateNested()
  @Type(() => FilterDto)
  @IsOptional()
  filters?: FilterDto;
}

export class ImageTransformDto {
  @ValidateNested()
  @Type(() => TransformationDto)
  @IsOptional()
  transformations?: TransformationDto;
}
