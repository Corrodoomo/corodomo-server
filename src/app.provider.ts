import { AppService } from './app.service';
import { FormatResponseInterceptor } from '@common/interceptors/format-response.interceptor';
import { ClassSerializerInterceptor, Provider } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';

export const providers: Provider[] = [
	AppService,
	{
		provide: APP_GUARD,
		useClass: ThrottlerGuard,
	},
	{
		provide: APP_INTERCEPTOR,
		useClass: ClassSerializerInterceptor,
	},
	{
		provide: APP_INTERCEPTOR,
		useClass: FormatResponseInterceptor,
	},
	{
		provide: APP_FILTER,
		useFactory() {
			return new I18nValidationExceptionFilter({
				errorFormatter(errors) {
					return errors.map(({ property, constraints }) => {
						const key = Object.keys(constraints || {})[0];
						const error = constraints?.[key] || 'Invalid';

						return {
							property,
							error,
						};
					});
				},
				responseBodyFormatter(host, exc, formattedErrors) {
					const response = exc.getResponse();
					const status = exc.getStatus();

					return {
						status,
						message: response,
						errors: formattedErrors,
					};
				},
			});
		},
	},
];
