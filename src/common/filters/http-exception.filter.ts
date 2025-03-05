// Import the Catch decorator
import { Response } from '@common/models/express.model';
import { Injectable, ExceptionFilter, ArgumentsHost, Logger, HttpException } from '@nestjs/common';
import { Catch } from '@nestjs/common';

@Catch(HttpException)
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
	private logger = new Logger('HttpExceptionFilter');

	catch(exception: HttpException, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();

		response.status(exception.getStatus()).json(exception.getResponse());
	}
}
