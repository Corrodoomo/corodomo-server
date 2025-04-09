import { User } from '@modules/database/entities';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

declare global {
  type Session = {
    id: string;
    email: string;
    role: string;
    iat: number; // Thời gian là số nguyên (timestamp)
    exp: number; // Thời gian hết hạn cũng là số nguyên
  };

  type SystemRequest = ExpressRequest & { user: User; timeId: string };

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
