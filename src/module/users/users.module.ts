import { Module } from '@nestjs/common';
import { UsersService } from './provider/users.service';
import { User } from './model/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
