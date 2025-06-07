import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

import { AuthMetadataMapper } from '@common/mappers/auth.mapper';
import { UserAgentMetadata } from '@common/types/session-metadata.type';

declare global {
  type TCachedSession = {
    id: string;
    createdAt: string;
    updatedAt: string;
    accessToken: string;
    idToken: string;
    refreshToken: string;
    userAgent: object;
  };

  type TSession = {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
  };

  type CustomRequest = {
    user: AuthMetadataMapper;
    session: TSession;
    timeId: string;
    headers: { authorization: string };
    userAgent: UserAgentMetadata;
    accessToken: string;
  };

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
