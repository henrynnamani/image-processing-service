import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAuth, IUser } from 'src/shared/types/user';
import { User } from '../model/user.entity';
import { ModelAction } from '@/shared/model-action';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private modelAction: ModelAction<User>;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.modelAction = new ModelAction(userRepository);
  }

  async createUser(user: IAuth) {
    try {
      const record = await this.modelAction.create(user);

      return record;
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }

  async findUserByUsername(username: string): Promise<User | null> {
    try {
      const record = await this.modelAction.findBy({ username });

      return record;
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }
}
