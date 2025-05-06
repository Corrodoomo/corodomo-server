import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { mergeMap } from 'rxjs';

import { options } from '@common/constants/cookie';
import { SignedInUserMapper } from '@common/mappers/user.mapper';

@Injectable()
export class InitializeSessionInterceptor implements NestInterceptor {
  logger = new Logger('Initialize Session Interceptor');

  intercept(context: ExecutionContext, next: CallHandler) {
    const response = context.switchToHttp().getResponse<SystemResponse>();

    return next.handle().pipe(
      mergeMap(async (result: SignedInUserMapper) => {
        this.logger.debug(JSON.stringify(result).substring(0, 1000));

        // Get access token and refresh token
        const { accessToken, refreshToken, idToken } = result;

        // Save them into cookie
        response.cookie('accessToken', accessToken, options);
        response.cookie('refreshToken', refreshToken, options);
        response.cookie('idToken', idToken, options);

        // Next data
        return { message: 'Login successful' };
      })
    );
  }
}
