import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Actions, AppAbility, PolicyAbilityFactory, Resources } from './policy.factory';

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

export const POLICIES_KEY = 'policies_key';

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
    const { action, resource } = this.reflector.get<{ action: Actions; resource: Resources}>(POLICIES_KEY, context.getHandler()) || [];

    // Detructing user
    const { user, params } = context.switchToHttp().getRequest<SystemRequest>();

    // Create permissions based on pricing plan for Learner role
    const ability = await this.policyAbilityFactory.learner(user, action, resource, params?.id);

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
