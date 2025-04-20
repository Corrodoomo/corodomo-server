import { User } from '@modules/database/entities';

/**
 * Re-map a object into AuthMetadataMapper
 */
export class AuthMetadataMapper {
  id: string;

  email: string;

  name: string;

  avatarUrl: string;

  userMetadata: {
    emailVerified: boolean;

    authProvider: string;
  };

  roleMetadata: {
    id: string;
    name: string;
  };

  pricingPlanMetadata: {
    id: string;
    name: string;
  };

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.avatarUrl = user.avatarUrl;

    this.userMetadata = {
      emailVerified: user.emailVerified,
      authProvider: user.authProvider,
    };

    this.roleMetadata = {
      id: user.role.id,
      name: user.role.name,
    };

    this.pricingPlanMetadata = {
      id: user.pricingPlan.id,
      name: user.pricingPlan.name,
    };
  }
}
