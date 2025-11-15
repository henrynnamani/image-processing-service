import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { SkipAuth } from '../decorator/skipAuth.decorator';
import { IAuth } from 'src/shared/types/user';
import { UsersService } from '@/module/users/provider/users.service';
import * as SYS_MSG from '@/shared/system-message';
import * as bcrypt from 'bcryptjs';
import { TokenService } from '@/shared/service/token.service';
import { TokenType } from '@/shared/enum/index.enum';

@SkipAuth()
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async register(data: IAuth) {
    try {
      const userExist = await this.usersService.findUserByUsername(
        data.username,
      );
      const salt = await bcrypt.genSalt(10);

      if (userExist) {
        throw new NotFoundException(SYS_MSG.USER_ALREADY_EXIST);
      }

      const hashedPassword = await bcrypt.hash(data.password, salt);

      const user = await this.usersService.createUser({
        ...data,
        password: hashedPassword,
      });

      const token = await this.tokenService.generateToken(
        {
          id: user.id,
          username: user.username,
        },
        TokenType.ACCESS,
      );

      return {
        message: '',
        data: {
          user,
          token,
        },
      };
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }

  async login(data: IAuth) {
    try {
      const userExist = await this.usersService.findUserByUsername(
        data.username,
      );

      if (!userExist) {
        throw new NotFoundException(SYS_MSG.ENTITY_NOT_FOUND);
      }

      const isValidPassword = await bcrypt.compare(
        data.password,
        userExist.password,
      );

      if (!isValidPassword) {
        throw new BadRequestException(SYS_MSG.INVALID_CREDENTIAL);
      }

      const token = await this.tokenService.generateToken(
        {
          id: userExist.id,
          username: userExist.username,
        },
        TokenType.ACCESS,
      );

      return {
        message: '',
        data: {
          user: userExist,
          token,
        },
      };
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }
}
