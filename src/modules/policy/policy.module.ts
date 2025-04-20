import { PricingPlanRepository } from '@modules/pricing-plan/pricing-plan.repository';
import { Global, Module } from '@nestjs/common';

import { PolicyAbilityFactory } from './policy.factory';

@Global()
@Module({
  providers: [PolicyAbilityFactory, PricingPlanRepository],
  exports: [PolicyAbilityFactory],
})
export class PolicyModule {}
