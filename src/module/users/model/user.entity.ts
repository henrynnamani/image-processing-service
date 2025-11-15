import { BaseEntity } from '@/shared/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;
}
