import { Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { MetadataKey } from '@common/constants';
import { SignedInUserDto } from '@common/dtos/user.dto';
import { Messages } from '@common/enums';

import { CacheService } from './cache.service';

export class UserCacheService extends CacheService {
  constructor(
    @Inject(MetadataKey.USER_REDIS) protected readonly redis: Redis,
    private readonly configService: ConfigService
  ) {
    super(redis);
  }

  async getItem(key: string): Promise<SignedInUserDto> {
    const value = await this.get(key);

    const [accessToken, refreshToken] = (value || '').split(':');

    return { accessToken, refreshToken };
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
