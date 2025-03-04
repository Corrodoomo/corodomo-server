import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

declare global {
	type DecodedUser = {
		user_roles: string[];
		nickname: string;
		name: string;
		picture: string;
		updated_at: string; // Thời gian có thể sử dụng Date nếu bạn muốn chuyển đổi
		email: string;
		email_verified: boolean;
		iss: string;
		aud: string;
		iat: number; // Thời gian là số nguyên (timestamp)
		exp: number; // Thời gian hết hạn cũng là số nguyên
		sub: string;
		sid: string;
		nonce: string;
	};

	type NestRequest = ExpressRequest & { user: DecodedUser };
	type NestResponse = ExpressResponse;

	type PaginatedResult<T> = {
		page: number;
		limit: number;
		total: number;
		items: T[];
	};

	type Env = 'dev' | 'staging' | 'production' | 'local';
	namespace NodeJS {
		interface ProcessEnv {
			/** Môi trường */
			NODE_ENV: Env;
			/** Port của app */
			PORT: number;
			/** Tên schema của database */
			MONGO_URI: string;
			/** Mã bí mật jwt */
			AUTH0_SECRET_KEY: string;
		}
	}
}
