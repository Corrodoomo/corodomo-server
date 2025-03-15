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

				THROTTLE_TTL: Joi.string().required(),
				THROTTLE_LIMIT: Joi.string().required(),

				ACCESS_SECRET_KEY: Joi.string().required(),
				ACCESS_SECRET_KEY_EXPIRE: Joi.string().required(),
				REFRESH_SECRET_KEY: Joi.string().required(),
				REFRESH_SECRET_KEY_EXPIRE: Joi.string().required(),

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
				ELASTICSEARCH_NODE: Joi.string().required(),
				STACK_VERSION: Joi.string().required(),
				ES_PORT: Joi.number().required(),
				KIBANA_PORT: Joi.number().required(),
				ELASTICSEARCH_USERNAME: Joi.string().required(),
				ELASTICSEARCH_PASSWORD: Joi.string().required(),
				KIBANA_USERNAME: Joi.string().required(),
				KIBANA_PASSWORD: Joi.string().required(),

				// Chatter Config
				CHATTER_API_URL: Joi.string().required(),
				CHATTER_HTTP_TIMEOUT: Joi.number().required(),
				CHATTER_MAX_REDIRECTS: Joi.number().required(),
			}),
		}),
	],
})
export class ConfigModule {}
