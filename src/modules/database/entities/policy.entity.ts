import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Permission } from './permission.entity';
import { PricingPlan } from './pricing-plan.entity';

@Index('policies_pkey', ['id'], { unique: true })
@Entity('policies', { schema: 'public' })
export class Policy extends BaseEntity {
  @Column('character varying', { name: 'name' })
  name: string;

  @OneToMany(() => Permission, (permission) => permission.policy)
  permissions: Permission[];

  @ManyToMany(() => PricingPlan, (plan) => plan.policies)
  @JoinTable({
    name: 'pricing_plan_policies', // 👈 tên bảng trung gian
    joinColumn: {
      name: 'policy_id', // 👈 cột trong bảng trung gian tham chiếu Policy
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'pricing_plan_id', // 👈 cột tham chiếu PricingPlan
      referencedColumnName: 'id',
    },
  })
  pricingPlans: PricingPlan[];
}
