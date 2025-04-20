import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initializeTransactionalContext, StorageDriver } from 'typeorm-transactional';

import { PaginationPipe, TransformPropertyPipe } from '@common/pipes';

import { AppModule } from './app.module';
import { useSwagger } from './app.swagger';


async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // Config transaction handler
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'debug', 'verbose'],
  });

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<string>('PORT') || 5000;
  const nodeEnv = configService.get<string>('NODE_ENV');

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

  app.enableCors({
    origin: configService.getOrThrow('CLIENT_DOMAIN'),
    credentials: true,
  });

  // TCP service
  app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: configService.getOrThrow('MQTT_URL'),
      username: configService.getOrThrow('MQTT_USERNAME'),
      password: configService.getOrThrow('MQTT_PASSWORD'),
    },
  });

  app.startAllMicroservices();

  app.setGlobalPrefix('api/v1');

  useSwagger(app);

  await app.listen(port).then(async () => {
    const url = await app.getUrl();
    logger.debug(`Your app is running on port ${port}`);
    logger.debug(`Environment: ${nodeEnv}`);
    logger.debug(`Documentation ${url}/docs`);
  });
}

bootstrap();
