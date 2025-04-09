import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '@common/decorators/roles.decorator';
import { Messages, SystemRoles } from '@common/enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<SystemRoles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are required, allow access
    if (!requiredRoles) return true;

    // If roles are required, check if the user has any of the required roles
    const user = context.switchToHttp().getRequest().user;
    const hasRequiredRole = requiredRoles.some((role) => user.role === role);

    if (!hasRequiredRole) {
      throw new ForbiddenException(Messages.PERMISSION_REQUIRED);
    }

    return hasRequiredRole;
  }
}
