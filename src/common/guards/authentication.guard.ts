import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { isEqual } from 'lodash';

import { Messages } from '@common/enums';
import { WebSession } from '@common/utils/session.util';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<SystemRequest>();
    const metadata = WebSession.getSessionMetadata(request);

    // Error if current session is not equal with logged in session
    if (!isEqual(request.session.metadata, metadata)) {
      throw new UnauthorizedException(Messages.DUPLICATED_DEVICE);
    }

    return true;
  }
}
