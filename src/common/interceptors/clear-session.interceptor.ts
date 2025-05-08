import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mergeMap } from 'rxjs';

import { SignedInUserMapper } from '@common/mappers/user.mapper';

@Injectable()
export class ClearSessionInterceptor implements NestInterceptor {
  logger = new Logger('Clear Session Interceptor');

  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const response = context.switchToHttp().getResponse<SystemResponse>();

    return next.handle().pipe(
      mergeMap(async (result: SignedInUserMapper) => {
        this.logger.debug(JSON.stringify(result).substring(0, 1000));

        // Clear all token from cookie
        response.clearCookie('accessToken');
        response.clearCookie('refreshToken');
        response.clearCookie('idToken');

        // Next data
        return result;
      })
    );
  }
}
