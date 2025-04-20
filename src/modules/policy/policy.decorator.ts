import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { Actions, AppAbility, Resources } from './policy.factory';
import { CHECK_POLICIES_KEY, PoliciesGuard, PolicyHandler } from './policy.guard';

/**
 * Policy Decorator
 * @param handlers
 * @returns
 */
export const Policy = (action: Actions, resource: Resources) => {
  return applyDecorators(
    UseGuards(PoliciesGuard),
    CheckPolicies((ability: AppAbility) => ability.can(action, resource))
  );
};

/**
 * Check policies decorator with callback
 * @param handlers
 * @returns
 */
export const CheckPolicies = (...handlers: PolicyHandler[]) => SetMetadata(CHECK_POLICIES_KEY, handlers);
