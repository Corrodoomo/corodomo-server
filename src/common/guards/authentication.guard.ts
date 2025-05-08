import { UserCacheService } from '@modules/cache/user-cache.service';
import { JwtService } from '@modules/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isEqual } from 'lodash';

import { IS_PUBLIC_KEY } from '@common/decorators/public-route.decorator';
import { Messages } from '@common/enums';
import { WebSession } from '@common/utils/session.util';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly cacheService: UserCacheService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<SystemRequest>();

    // Add your custom authentication logic here (Example: Check user roles)
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Next step if Api is public
    if (isPublic) {
      return true;
    }

    // Verify id token
    this.jwtService.verifyIdToken(request.cookies.idToken);

    // Get all cached sessions
    const session = await this.cacheService.existSession(request.cookies.idToken);

    // Get user agent of current request
    const userAgent = WebSession.getSessionMetadata(request);

    // Error if current session is not equal with logged in session
    if (!isEqual(session.userAgent, userAgent)) {
      throw new UnauthorizedException(Messages.DUPLICATED_DEVICE);
    }

    return true;
  }
}
