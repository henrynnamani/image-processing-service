import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResizeDto {
  @ApiPropertyOptional({ type: 'number', example: 500 })
  @IsNumber()
  @IsOptional()
  width: number;

  @ApiPropertyOptional({ type: 'number', example: 1000 })
  @IsNumber()
  @IsOptional()
  height: number;
}

export class CropDto {
  @ApiPropertyOptional({ type: 'number', example: 459 })
  @IsNumber()
  @IsOptional()
  width: number;

  @ApiPropertyOptional({ type: 'number', example: 200 })
  @IsNumber()
  @IsOptional()
  height: number;

  @ApiPropertyOptional({ type: 'number', example: 400 })
  @IsNumber()
  @IsOptional()
  x: number;

  @ApiPropertyOptional({ type: 'number', example: 120 })
  @IsNumber()
  @IsOptional()
  y: number;
}

export class FilterDto {
  @ApiPropertyOptional({ type: 'boolean', example: false })
  @IsBoolean()
  @IsOptional()
  grayscale: boolean;

  @ApiPropertyOptional({ type: 'boolean', example: false })
  @IsBoolean()
  @IsOptional()
  sepia: boolean;
}

export class TransformationDto {
  @ApiPropertyOptional({ type: ResizeDto })
  @ValidateNested()
  @Type(() => ResizeDto)
  @IsOptional()
  resize?: ResizeDto;

  @ApiPropertyOptional({ type: CropDto })
  @ValidateNested()
  @Type(() => CropDto)
  @IsOptional()
  crop?: CropDto;

  @ApiPropertyOptional({ type: 'number', example: 30 })
  @IsNumber()
  @IsOptional()
  rotate?: number;

  @ApiPropertyOptional({ type: 'string', example: 'jpeg' })
  @IsString()
  @IsOptional()
  format?: string;

  @ApiPropertyOptional({ type: FilterDto })
  @ValidateNested()
  @Type(() => FilterDto)
  @IsOptional()
  filters?: FilterDto;
}

export class ImageTransformDto {
  @ApiPropertyOptional({ type: TransformationDto })
  @ValidateNested()
  @Type(() => TransformationDto)
  @IsOptional()
  transformations?: TransformationDto;
}
