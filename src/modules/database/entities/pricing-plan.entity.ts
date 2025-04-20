import { Column, Entity, Index, JoinTable, ManyToMany, OneToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Policy } from './policy.entity';
import { User } from './user.entity';

@Index('pricing_plans_pkey', ['id'], { unique: true })
@Entity('pricing_plans', { schema: 'public' })
export class PricingPlan extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'double precision' })
  price: number;

  @Column({ type: 'int' })
  duration_in_days: number;

  @Column({ type: 'varchar' })
  description: string;

  @OneToOne(() => User, (user) => user.pricingPlan)
  user: User;

  @ManyToMany(() => Policy, (policy) => policy.pricingPlans)
  @JoinTable({
    name: 'pricing_plan_policies', // 👈 tên bảng trung gian
    joinColumn: {
      name: 'pricing_plan_id', // 👈 cột trong bảng trung gian tham chiếu Policy
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'policy_id', // 👈 cột tham chiếu PricingPlan
      referencedColumnName: 'id',
    },
  })
  policies: Policy[];
}
