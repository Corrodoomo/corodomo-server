import { SetMetadata } from '@nestjs/common';

import { SystemRoles } from '@common/enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: [SystemRoles, ...SystemRoles[]]) => SetMetadata(ROLES_KEY, roles);
