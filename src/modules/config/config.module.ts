import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        // Node Config
        NODE_ENV: Joi.string().valid('dev', 'production', 'test').required(),
        PORT: Joi.number().port().required(),
        CLIENT_DOMAIN: Joi.string().required(),

        ACCESS_SECRET_KEY: Joi.string().required(),
        ACCESS_TOKEN_EXPIRE: Joi.number().required(),
        REFRESH_SECRET_KEY: Joi.string().required(),
        REFRESH_TOKEN_EXPIRE: Joi.string().required(),
        QR_CODE_KEY: Joi.string().required(),
        QR_CODE_EXPIRE: Joi.number().required(),
        BCRYPT_SALT_OR_ROUNDS: Joi.number().required(),

        GITHUB_CLIENT_ID: Joi.string().required(),
        GITHUB_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),

        // Database Postgres Config
        DB_HOST: Joi.string().hostname().required(),
        DB_PORT: Joi.number().port().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_SCHEMA: Joi.string().valid('public', 'other_schema').required(),
        DB_CACHE_TIME: Joi.number().positive().required(),
        DB_CACHE: Joi.number().required(),

        // Redis Config
        REDIS_HOST: Joi.string().hostname().required(),
        REDIS_PORT: Joi.number().port().required(),
        REDIS_USER_DB: Joi.number().integer().min(0).required(),
        REDIS_PASSWORD: Joi.string().optional(),
        REDIS_PREFIX: Joi.string().optional(),

        // ElasticSearch Config
        ELASTIC_NODE: Joi.string().required(),
        STACK_VERSION: Joi.string().required(),
        ES_PORT: Joi.number().required(),
        KIBANA_PORT: Joi.number().required(),
        ELASTIC_USERNAME: Joi.string().required(),
        ELASTIC_PASSWORD: Joi.string().required(),
        KIBANA_USERNAME: Joi.string().required(),
        KIBANA_PASSWORD: Joi.string().required(),

        // OPEN_AI Config
        OPEN_AI_API_URL: Joi.string().required(),
        OPEN_AI_HTTP_TIMEOUT: Joi.number().required(),
        OPEN_AI_MAX_REDIRECTS: Joi.number().required(),
        OPEN_AI_MODEL: Joi.string().required(),
        OPEN_AI_BASE_URL: Joi.string().required(),
        OPEN_AI_API_KEY: Joi.string().required(),

        // RATE LIMITER
        RATE_LIMITER_MAX: Joi.number().integer().required(),
        RATE_LIMITER_TLL: Joi.number().integer().required(),

        // MQTT
        MQTT_URL: Joi.string().required(),
        MQTT_USERNAME: Joi.string().required(),
        MQTT_PASSWORD: Joi.string().required(),
      }),
    }),
  ],
})
export class ConfigModule {}
