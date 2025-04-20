import { PricingPlan } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@common/repository';

@Injectable()
export class PricingPlanRepository extends BaseRepository<PricingPlan> {
  constructor(private dataSource: DataSource) {
    super(PricingPlan, dataSource.createEntityManager());
  }

  /**
   * Query all policy of a pricing plan
   * @param pricingPlanId 
   * @returns 
   */
  public async queryPermissions(pricingPlanId: string) {
    return this.createQueryBuilder('pricing')
      .innerJoinAndSelect('pricing.policies', 'policy')
      .innerJoinAndSelect('policy.permissions', 'permission')
      .where('pricing.id = :pricingPlanId', { pricingPlanId })
      .getOne();
  }
}
