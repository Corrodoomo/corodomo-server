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

				// Database Postgres Config
				DB_HOST: Joi.string().hostname().required(),
				DB_PORT: Joi.number().port().required(),
				DB_USERNAME: Joi.string().required(),
				DB_PASSWORD: Joi.string().required(),
				DB_NAME: Joi.string().required(),
				DB_SCHEMA: Joi.string().valid('public', 'other_schema').required(),
				DB_CACHE_TIME: Joi.number().positive().required(),

				// Redis Config
				REDIS_HOST: Joi.string().hostname().required(),
				REDIS_PORT: Joi.number().port().required(),
				REDIS_DB: Joi.number().integer().min(0).required(),
				REDIS_PASSWORD: Joi.string().optional(),
				REDIS_PREFIX: Joi.string().optional(),
			}),
		}),
	],
})
export class ConfigModule {}
