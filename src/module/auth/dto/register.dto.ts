import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ type: 'string', example: 'joy' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: 'string', example: 'Pyr_38234hslfhorn1' })
  @IsString()
  @IsStrongPassword({
    minLength: 5,
    minLowercase: 1,
    minUppercase: 1,
  })
  password: string;
}
