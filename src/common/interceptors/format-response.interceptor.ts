import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

import { HttpResponse } from '@common/dtos';
import { Request, Response } from '@common/models';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const status = response.statusCode;

    return next.handle().pipe(
      map(async (result) => {
        console.timeEnd(request.timeId);
        return new HttpResponse(result, status);
      })
    );
  }
}
