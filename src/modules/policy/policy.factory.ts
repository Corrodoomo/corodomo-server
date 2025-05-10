import { AbilityBuilder, AbilityClass, PureAbility } from '@casl/ability';
import { PricingPlanRepository } from '@modules/pricing-plan/pricing-plan.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

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
  | 'users'
  | 'exams'
  | 'mindmap';

/**
 * App Ability type
 */
export type AppAbility = PureAbility<[Actions, Resources]>;

@Injectable()
export class PolicyAbilityFactory {
  constructor(
    private readonly dataSource: DataSource,
    private readonly pricingPlanRepository: PricingPlanRepository
  ) {}

  /**
   * Query all permisison from database and then, initialize permissions for Learner role
   * @param user
   * @returns
   */
  async learner(user: AuthMetadataMapper, action: Actions, resource: Resources, resourceId?: string) {
    // Destrucing function
    const { can, build } = new AbilityBuilder<PureAbility<[Actions, Resources]>>(
      PureAbility as AbilityClass<AppAbility>
    );

    // Query permission by pricing
    const pricing = await this.pricingPlanRepository.queryPermissions(user.pricingPlanMetadata.id);

    // If pricing has existed
    if (pricing) {
      pricing.policies.forEach((policy) => {
        policy.permissions.forEach(async (permission) => {
          // Pass if it is valid with flexible conditions in database permissions
          if (user.userMetadata.emailVerified !== permission.conditions[0]['email_verified']) {
            return;
          }

          if (permission.action === Action.WRITE_READ) {
            // Pass if owner id is equal to user id
            if (Boolean(permission.conditions[0]['owner']) && action === 'write/read') {
              // Check if resource id is valid
              const records = await this.dataSource.query(
                `SELECT id FROM ${resource} WHERE id = $1 AND created_by = $2 LIMIT 1`,
                [resourceId, user.id]
              );

              if (!records.length) {
                return;
              }
            }
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
