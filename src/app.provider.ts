import { AppService } from '@app/app.service';
import { Provider } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { TypeOrmFilter } from '@common/filters/typeorm.filter';
import { UndefinedExceptionFilter } from '@common/filters/undefined-exception.filter';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { FormatResponseInterceptor } from '@common/interceptors/format-response.interceptor';

export const providers: Provider[] = [
  AppService,
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },
  {
    provide: APP_FILTER,
    useClass: UndefinedExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: TypeOrmFilter,
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: FormatResponseInterceptor,
  },
];
