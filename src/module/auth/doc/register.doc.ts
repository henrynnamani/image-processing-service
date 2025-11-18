import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

export const registerDoc = () =>
  applyDecorators(
    ApiOperation({ summary: 'Register user' }),
    ApiBody({ type: RegisterDto }),
  );

export const loginDoc = () =>
  applyDecorators(
    ApiOperation({ summary: 'Register user' }),
    ApiBody({ type: LoginDto }),
  );
