import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { Cookie } from 'express-session';

import { AuthMetadataMapper } from '@common/mappers/auth.mapper';
import { SignedInUserMapper } from '@common/mappers/user.mapper';

declare global {
  type Session = {
    id: string;
    email: string;
    role: string;
    iat: number; // Thời gian là số nguyên (timestamp)
    exp: number; // Thời gian hết hạn cũng là số nguyên
  };

  type CustomCookie = Cookie & SignedInUserMapper

  type CustomRequest = { user: AuthMetadataMapper; cookies: CustomCookie; timeId: string };

  type SystemRequest = ExpressRequest & CustomRequest;

  type SystemResponse = ExpressResponse;

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
    }
  }
}
