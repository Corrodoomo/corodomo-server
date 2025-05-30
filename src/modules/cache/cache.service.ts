import Redis from 'ioredis';
import { isNil } from 'lodash';

export class CacheService {
  constructor(protected readonly redis: Redis) {}

  /**
   * Set key based on expired time
   * @param key
   * @param value
   * @param expired
   * @returns
   */
  set(key: string, value: string, expired: string | number): Promise<'OK'> {
    return this.redis.set(key, value, 'EX', expired);
  }

  /**
   * Set key unlimit
   * @param key
   * @param value
   * @returns
   */
  setNx(key: string, value: string): Promise<number> {
    return this.redis.setnx(key, value);
  }

  /**
   * Get value by key
   * @param key
   * @returns
   */
  async get<T>(key: string) {
    const value = await this.get(key);

    // Error if session not found
    if (isNil(value)) return null;

    return JSON.parse(value) as T;
  }

  /**
   * Delete by key
   * @param key
   * @returns
   */
  del(key: string) {
    return this.redis.del(key);
  }

  /**
   * Query value by key prefix
   * @param prefix
   * @returns
   */
  keys(prefix: string) {
    return this.redis.keys(`${prefix}:*`);
  }

  /**
   * Get token from item
   * @param key
   * @returns
   */
  prefix(prefixKey: string) {
    return {
      set: (key: string, value: object, expired: string | number) => this.set(`${prefixKey}:${key}`, JSON.stringify(value), expired),
      get: (key: string) => this.get(`${prefixKey}:${key}`),
      del: (key: string) => this.del(`${prefixKey}:${key}`),
    };
  }
}
