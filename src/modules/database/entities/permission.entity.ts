import { Actions, Resources } from '@modules/policy/policy.factory';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Policy } from './policy.entity';

@Index('permissions_pkey', ['id'], { unique: true })
@Entity('permissions', { schema: 'public' })
export class Permission extends BaseEntity {
  @PrimaryColumn('uuid', { name: 'name' })
  id: string;

  @Column('character varying', { name: 'action' })
  action: Actions;

  @Column('character varying', { name: 'resource' })
  resource: Resources;

  @Column('jsonb', { name: 'conditions' })
  conditions: Record<string, unknown>[];

  @Column('character varying', { name: 'description' })
  description: string;

  @ManyToOne(() => Policy, (policy) => policy.permissions)
  @JoinColumn([{ name: 'policy_id', referencedColumnName: 'id' }])
  policy: Policy;
}
