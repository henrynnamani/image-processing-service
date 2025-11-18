import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllImageDto {
  @ApiPropertyOptional({ type: 'number', example: 1 })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional({ type: 'number', example: 10 })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit: number = 10;
}
