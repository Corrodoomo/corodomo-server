import { Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Permission } from './permission.entity';

@Index('resources_pkey', ['id'], { unique: true })
@Entity('resources', { schema: 'public' })
export class Resource extends BaseEntity {
  @PrimaryColumn('character varying')
  id: string;

  @OneToMany(() => Permission, (permission) => permission.resource)
  permission: Permission;
}
