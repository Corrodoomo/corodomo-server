import {
	Injectable,
	ExceptionFilter,
	ArgumentsHost,
	InternalServerErrorException,
	Logger
} from '@nestjs/common';
import { Catch } from '@nestjs/common'; // Import the Catch decorator
import { Response } from '@common/models/express.model';

@Catch()
@Injectable()
export class UndefinedExceptionFilter implements ExceptionFilter {
	private logger = new Logger('UndefinedExceptionFilter');

	catch(exception: Error, host: ArgumentsHost) {
		this.logger.error(exception);

		const context = host.switchToHttp();
		const response = context.getResponse<Response>();
		const error = new InternalServerErrorException();

		response.status(error.getStatus()).json(error.getResponse());
	}
}
