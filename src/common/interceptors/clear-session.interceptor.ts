import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mergeMap } from 'rxjs';

import { Messages } from '@common/enums';
import { SignedInUserMapper } from '@common/mappers/user.mapper';

@Injectable()
export class ClearSessionInterceptor implements NestInterceptor {
  logger = new Logger('Clear Session Interceptor');

  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<SystemRequest>();
    const response = context.switchToHttp().getResponse<SystemResponse>();

    return next.handle().pipe(
      mergeMap(async (result: SignedInUserMapper) => {
        this.logger.debug(JSON.stringify(result).substring(0, 1000));

        // Clear all token from cookie
        response.clearCookie('accessToken');
        response.clearCookie('refreshToken');

        // Destroy session for user
        await this.destroy(request);

        // Next data
        return result;
      })
    );
  }

  /**
   * Destroy all session
   * @param request
   * @returns
   */
  destroy(request: SystemRequest) {
    return new Promise((resolve, reject) => {
      request.session.destroy((err) => {
        if (err) {
          return reject(new InternalServerErrorException(Messages.ERROR_DESTROYING_SESSION));
        }

        // Clear cookies
        request.res?.clearCookie(this.configService.getOrThrow('SESSION_NAME'));
        resolve(true);
      });
    });
  }
}
