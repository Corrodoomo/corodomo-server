import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

import { HttpResponse } from '@common/dtos';
import { Request, Response } from '@common/models';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  logger = new Logger('Format Response Interceptor');

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const status = response.statusCode;

    return next.handle().pipe(
      map((result) => {
        console.timeEnd(request.timeId);
        this.logger.debug(JSON.stringify(result).substring(0, 1000));

        return new HttpResponse(result, status);
      })
    );
  }
}
