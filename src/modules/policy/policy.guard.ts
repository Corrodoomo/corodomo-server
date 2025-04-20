import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AppAbility, PolicyAbilityFactory } from './policy.factory';

/**
 * Policy Handler interface
 */
interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

/**
 * Policy Handler Callback type
 */
type PolicyHandlerCallback = (ability: AppAbility) => boolean;

/**
 * Policy Handler type
 */
export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

/**
 * Policy Metadata Key
 */
export const CHECK_POLICIES_KEY = 'check_policy';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private policyAbilityFactory: PolicyAbilityFactory
  ) {}

  /**
   * Active router
   * @param context
   * @returns
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get all metadata
    const policyHandlers = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];

    // Detructing user
    const { user } = context.switchToHttp().getRequest<SystemRequest>();

    // Create permissions based on pricing plan for Learner role
    const ability = await this.policyAbilityFactory.learner(user);

    // Forloop if all is valid
    return policyHandlers.every((handler) => this.execPolicyHandler(handler, ability));
  }

  /**
   * Exec policy handler
   * @param handler
   * @param ability
   * @returns
   */
  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
