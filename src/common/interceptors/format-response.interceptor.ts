import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';
import { HttpResponse } from '@common/models/http-response.model';
import { Response } from '@common/models/express.model';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {

	intercept(context: ExecutionContext, next: CallHandler) {
		const response = context.switchToHttp().getResponse<Response>();
		const status = response.statusCode;

		return next.handle().pipe(
			map(async (result) => {
				return new HttpResponse(status, result);
			})
		);
	}
}
