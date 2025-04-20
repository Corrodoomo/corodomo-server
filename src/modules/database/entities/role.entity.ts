import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Index('roles_pkey', ['id'], { unique: true })
@Entity('roles', { schema: 'public' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'name' })
  name: string;

  @OneToOne(() => User, (user) => user.role)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
