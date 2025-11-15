import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from '../enum/index.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(payload: any, type: TokenType) {
    return this.jwtService.sign(payload, {
      expiresIn:
        type === TokenType.ACCESS
          ? this.configService.get('jwt.expires.access')
          : this.configService.get('jwt.expires.refresh'),
    });
  }
}
