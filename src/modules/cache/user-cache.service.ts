import { Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { MetadataKey } from '@common/constants';
import { USER_TOKEN } from '@common/constants/token';
import { Messages } from '@common/enums';
import { SignedInUserMapper } from '@common/mappers/user.mapper';
import { TUserTokenType } from '@common/types/token.type';

import { CacheService } from './cache.service';

export class UserCacheService extends CacheService {
  constructor(
    @Inject(MetadataKey.USER_REDIS) protected readonly redis: Redis,
    private readonly configService: ConfigService
  ) {
    super(redis);
  }

  async getItem(key: string): Promise<SignedInUserMapper> {
    const value = await this.get(key);
    if (!value) return { accessToken: '', refreshToken: '' };

    const tokenData = JSON.parse(value);
    return {
      accessToken: tokenData.accessToken,
      refreshToken: tokenData.refreshToken,
    };
  }

  /**
   * Set Json Item
   * @param key
   * @param value
   * @returns
   */
  async setItem(key: string, value: object) {
    return this.set(key, JSON.stringify(value), this.configService.getOrThrow('ACCESS_SECRET_REDIS_EXPIRE'));
  }

  async existToken(userId: string) {
    const existed = await this.get(userId);

    if (existed) {
      throw new UnauthorizedException(Messages.DUPLICATED_SESSION);
    }
  }

  async validateToken(userId: string, type: TUserTokenType, token: string) {
    const storedToken = await this.getItem(userId);

    if (!storedToken || storedToken[type] !== token) {
      const message = type === USER_TOKEN.ACCESS_TOKEN ? Messages.INVALID_ACCESS_TOKEN : Messages.INVALID_REFRESH_TOKEN;

      throw new UnauthorizedException(message);
    }
  }
}
