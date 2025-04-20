import { AuthMetadataMapper } from '@common/mappers/auth.mapper';

export type JWTPayLoad = {
  exp?: number;
  iat?: number;
} & AuthMetadataMapper;
