import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

import { options } from '@common/constants/cookie';
import { SignedInUserMapper } from '@common/mappers/user.mapper';

@Injectable()
export class RefreshSessionInterceptor implements NestInterceptor {
  logger = new Logger('Refresh Session Interceptor');

  intercept(context: ExecutionContext, next: CallHandler) {
    const response = context.switchToHttp().getResponse<SystemResponse>();

    return next.handle().pipe(
      map((result: SignedInUserMapper) => {
        this.logger.debug(JSON.stringify(result));

        // Get access token and refresh token
        const { accessToken, refreshToken } = result;

        // Save them into cookie
        response.cookie('accessToken', accessToken, options);
        response.cookie('refreshToken', refreshToken, options);

        // Next data
        return { message: 'Refresh successful' };
      })
    );
  }
}
