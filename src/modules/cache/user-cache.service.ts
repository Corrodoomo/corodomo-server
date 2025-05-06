import { Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { isNil } from 'lodash';

import { MetadataKey } from '@common/constants';
import { Messages } from '@common/enums';

import { CacheService } from './cache.service';

export class UserCacheService extends CacheService {
  constructor(
    @Inject(MetadataKey.USER_REDIS) protected readonly redis: Redis,
    private readonly configService: ConfigService
  ) {
    super(redis);
  }

  /**
   * Set session
   * @param key 
   * @param value 
   * @returns 
   */
  async setSession(key: string, value: object) {
    return this.set(`session_${key}`, JSON.stringify(value), this.configService.getOrThrow('REFRESH_SECRET_KEY_EXPIRE'));
  }

  /**
   * Set session by devices
   * @param key 
   * @param value 
   * @returns 
   */
  async setSessionDevices(key: string, value: object) {
    return this.setNx(`session_devices_${key}`, JSON.stringify(value));
  }

  /**
   * Check if token has existed
   * @param userId
   * @returns
   */
  async existSession(idToken: string) {
    const value = await this.get(`session_${idToken}`);
    console.log('`session_${idToken}`', `session_${idToken}`);
    // Error if session not found
    if (isNil(value)) {
      throw new UnauthorizedException(Messages.SESSION_NOT_FOUND);
    }

    return JSON.parse(value) as TCachedSession;
  }
}
