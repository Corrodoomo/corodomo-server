import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';
import { PricingPlanRepository } from '@modules/pricing-plan/pricing-plan.repository';
import { Injectable } from '@nestjs/common';

import { AuthMetadataMapper } from '@common/mappers/auth.mapper';

/**
 * Action defined
 */
export enum Action {
  Manage = 'manage',
  Create = 'create',
  READ = 'read',
  Update = 'update',
  Delete = 'delete',
  WRITE_READ = 'write/read',
  WRITE = 'write',
}

/**
 * Action string value
 */
export type Actions = `${Action}`;

/**
 * Role defined
 */
export enum Role {
  LEARNER = 'learner',
  ADMIN = 'admin',
}

/**
 * Resource string value
 */
export type Resources =
  | 'lessons'
  | 'folders'
  | 'blogs'
  | 'lesson_comments'
  | 'noted_vocabularies'
  | 'lesson_notes'
  | 'projects'
  | 'quizzes'
  | 'subtitles'
  | 'tasks'
  | 'vocabularies'
  | 'workspaces'
  | 'users';

/**
 * App Ability type
 */
export type AppAbility = Ability<[Actions, Resources]>;

@Injectable()
export class PolicyAbilityFactory {
  constructor(private readonly pricingPlanRepository: PricingPlanRepository) {}

  /**
   * Query all permisison from database and then, initialize permissions for Learner role
   * @param user
   * @returns
   */
  async learner(user: AuthMetadataMapper) {
    // Destrucing function
    const { can, build } = new AbilityBuilder<Ability<[Actions, Resources]>>(Ability as AbilityClass<AppAbility>);

    // Query permission by pricing
    const pricing = await this.pricingPlanRepository.queryPermissions(user.pricingPlanMetadata.id);

    // If pricing has existed
    if (pricing) {
      pricing.policies.forEach((policy) => {
        policy.permissions.forEach((permission) => {
          // Pass if it is valid with flexible conditions in database permissions
          if (user.userMetadata.emailVerified !== permission.conditions[0]['email_verified']) {
            return;
          }

          if (permission.action === Action.WRITE_READ) {
            can(Action.Create, permission.resource);
            can(Action.Update, permission.resource);
            can(Action.Delete, permission.resource);

            can(Action.READ, permission.resource);
            return;
          }

          // Create permission based on action and resource allowed in the database
          can(permission.action, permission.resource);
        });
      });
    }

    // Build all permission
    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) => item,
    });
  }
}
