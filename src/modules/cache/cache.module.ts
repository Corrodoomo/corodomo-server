import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { MetadataKey } from '@common/constants';

import { UserCacheService } from './user-cache.service';

const providers = [
  {
    provide: MetadataKey.USER_REDIS,
    useFactory(config: ConfigService) {
      return new Redis({
        port: config.getOrThrow<number>('REDIS_PORT'),
        host: config.getOrThrow<string>('REDIS_HOST'),
        db: config.getOrThrow<number>('REDIS_USER_DB'),
        password: config.getOrThrow<string>('REDIS_PASSWORD'),
        keyPrefix: config.getOrThrow<string>('REDIS_PREFIX'),
      });
    },
    inject: [ConfigService],
  },
];

@Global()
@Module({
  providers: [...providers, UserCacheService],
  exports: [...providers, UserCacheService],
})
export class CacheModule {}
