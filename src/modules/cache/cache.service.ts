import Redis from 'ioredis';
import { isNil } from 'lodash';

export class CacheService {
  constructor(protected readonly redis: Redis) {}

  async set(key: string, value: string, expired: string | number): Promise<'OK'> {
    await this.del(key);
    return this.redis.set(key, value, 'EX', expired);
  }
  async setNx(key: string, value: string): Promise<number> {
    await this.del(key);
    return this.redis.setnx(key, value);
  }
  get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }
  del(key: string) {
    return this.redis.del(key);
  }
  keys(prefix: string) {
    return this.redis.keys(`${prefix}:*`);
  }

  /**
   * Get token from item
   * @param key
   * @returns
   */
  async getJsonItem<T>(key: string) {
    const value = await this.get(key);

    // Error if session not found
    if (isNil(value)) return null;

    return JSON.parse(value) as T;
  }
}
