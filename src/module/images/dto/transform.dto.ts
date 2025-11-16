import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';

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
  @Validate(() => ResizeDto)
  @IsOptional()
  resize: ResizeDto;

  @Validate(() => ResizeDto)
  @IsOptional()
  crop: CropDto;

  @IsNumber()
  @IsOptional()
  rotate: number;

  @IsString()
  @IsOptional()
  format: string;

  @Validate(() => FilterDto)
  @IsOptional()
  filter: FilterDto;
}

export class ImageTransformDto {
  @Validate(() => TransformationDto)
  @IsOptional()
  transformations: TransformationDto;
}
