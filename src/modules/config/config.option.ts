import * as Joi from 'joi';

export const options = {
	isGlobal: true,
	envFilePath: '.env',
	validationSchema: Joi.object({
		NODE_ENV: Joi.string(),
		PORT: Joi.number(),
		MONGO_URI: Joi.string(),
		AUTH0_SECRET_KEY: Joi.string().required(),
	}),
};
