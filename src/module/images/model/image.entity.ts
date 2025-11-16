import { User } from '@/module/users/model/user.entity';
import { BaseEntity } from '@/shared/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('images')
export class Image extends BaseEntity {
  @ManyToOne(() => User, (user) => user.images)
  user: User;

  @Column({ type: 'varchar', nullable: false })
  url: string;
}
