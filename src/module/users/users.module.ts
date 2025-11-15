import { Module } from '@nestjs/common';
import { UsersService } from './provider/users.service';

@Module({
  providers: [UsersService]
})
export class UsersModule {}
