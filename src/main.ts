import { join } from 'path';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RedisStore } from 'connect-redis';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as session from 'express-session';
import Redis from 'ioredis';
import { initializeTransactionalContext, StorageDriver } from 'typeorm-transactional';

import { PaginationPipe, TransformPropertyPipe } from '@common/pipes';
import { ms, StringValue } from '@common/utils/ms.util';
import { parseBoolean } from '@common/utils/parse-boolean.util';

import { AppModule } from './app.module';
import { useSwagger } from './app.swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'debug', 'verbose'],
  });

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<string>('PORT') || 5000;
  const nodeEnv = configService.get<string>('NODE_ENV');

  const redisClient = new Redis({
    port: configService.getOrThrow<number>('REDIS_PORT'),
    host: configService.getOrThrow<string>('REDIS_HOST'),
    db: configService.getOrThrow<number>('SESSION_DB'),
    password: configService.getOrThrow<string>('REDIS_PASSWORD'),
  });

  app.useGlobalPipes(
    new PaginationPipe(),
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
    }),
    new TransformPropertyPipe()
  );

  app.use(
    session({
      secret: configService.getOrThrow<string>('SESSION_SECRET'),
      name: configService.getOrThrow<string>('SESSION_NAME'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        domain: configService.getOrThrow<string>('SESSION_DOMAIN'),
        maxAge: ms(configService.getOrThrow<StringValue>('SESSION_MAX_AGE')),
        httpOnly: parseBoolean(configService.getOrThrow<string>('SESSION_HTTP_ONLY')),
        secure: parseBoolean(configService.getOrThrow<string>('SESSION_SECURE')),
        sameSite: 'lax',
      },
      store: new RedisStore({
        client: redisClient,
        prefix: configService.getOrThrow<string>('SESSION_PREFIX'),
      }),
    })
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
  app.setBaseViewsDir(join(__dirname, 'views'));
  app.setViewEngine('hbs');
  app.use(cookieParser());
  useSwagger(app);

  await app.listen(port).then(async () => {
    const url = await app.getUrl();
    logger.debug(`Your app is running on port ${port}`);
    logger.debug(`Environment: ${nodeEnv}`);
    logger.debug(`Documentation ${url}/docs`);
  });
}

bootstrap();
