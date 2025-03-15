import { Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { MetadataKey } from '@common/constants';

import { CacheService } from './cache.service';
import { Messages } from '@common/enums';

export class UserCacheService extends CacheService {
  constructor(
    @Inject(MetadataKey.USER_REDIS) protected readonly redis: Redis,
    private readonly configService: ConfigService
  ) {
    super(redis);
  }

  async setItem(key: string, value: string) {
    await this.del(key);
    return this.set(key, value, this.configService.getOrThrow('ACCESS_SECRET_REDIS_EXPIRE'));
  }

  async existToken(userId: string) {
    const existed = await this.get(userId);

    if (existed) {
      throw new UnauthorizedException(Messages.DUPLICATED_SESSION);
    }
  }
}
