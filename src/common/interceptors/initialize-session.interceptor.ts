import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { mergeMap } from 'rxjs';

import { options } from '@common/constants/cookie';
import { Messages } from '@common/enums';
import { SignedInUserMapper } from '@common/mappers/user.mapper';
import { WebSession } from '@common/utils/session.util';

@Injectable()
export class InitializeSessionInterceptor implements NestInterceptor {
  logger = new Logger('Initialize Session Interceptor');

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<SystemRequest>();
    const response = context.switchToHttp().getResponse<SystemResponse>();

    return next.handle().pipe(
      mergeMap(async (result: SignedInUserMapper) => {
        this.logger.debug(JSON.stringify(result).substring(0, 1000));

        // Get access token and refresh token
        const { accessToken, refreshToken } = result;

        // Save them into cookie
        response.cookie('accessToken', accessToken, options);
        response.cookie('refreshToken', refreshToken, options);

        // Save session for user
        await this.save(request);

        // Next data
        return { message: 'Login successful' };
      })
    );
  }

  /**
   * Save session based on user agent
   * @param user
   * @returns
   */
  save(request: SystemRequest) {
    // Get metadata
    const metadata = WebSession.getSessionMetadata(request);

    // Process async/await
    return new Promise((resolve, reject) => {
      // Re generate a new session
      request.session.regenerate((err) => {
        if (err) reject(new InternalServerErrorException(Messages.ERROR_REGENERATING_SESSION));

        // All data is saved to session
        request.session.createdAt = new Date();
        request.session.userId = request.user.id;
        request.session.metadata = metadata;

        // End process
        request.session.save((err) => {
          if (err) reject(new InternalServerErrorException(Messages.ERROR_SAVING_SESSION));
          resolve(true);
        });
      });
    });
  }
}
