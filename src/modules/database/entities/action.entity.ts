import { Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Permission } from './permission.entity';

@Index('actions_pkey', ['id'], { unique: true })
@Entity('actions', { schema: 'public' })
export class Action extends BaseEntity {
  @PrimaryColumn('character varying')
  id: string;

  @OneToMany(() => Permission, (permission) => permission.action)
  permission: Permission;
}
