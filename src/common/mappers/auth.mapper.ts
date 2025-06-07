import { User } from '@modules/database/entities';

import { ItemMapper } from './common.mapper';
import { UserAgentMetadata } from '@common/types/session-metadata.type';

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

/**
 * Class defined cached information for users
 */
export class CachedUser {
  id: string;
  userAgent: UserAgentMetadata;
  accessToken: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Re-map a object into AuthUserMapper
 */
export class QRCodeMapper extends ItemMapper<{ qrToken: string, userAgent: UserAgentMetadata }> {
  constructor(qrToken: string, userAgent: UserAgentMetadata) {
    super({ qrToken, userAgent });
  }
}
