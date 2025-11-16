import { Image } from '@/module/images/model/image.entity';
import { BaseEntity } from '@/shared/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Image, (image) => image.user)
  images: Image[];
}
