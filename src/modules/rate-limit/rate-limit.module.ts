import { ConfigModule } from '@modules/config/config.module';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import Redis from 'ioredis';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            name: 'medium',
            limit: config.getOrThrow<number>('MEDIUM_RATE_LIMITER_MAX'),
            ttl: seconds(config.getOrThrow<number>('MEDIUM_RATE_LIMITER_TLL')),
          },
          {
            name: 'long',
            limit: config.getOrThrow<number>('LONG_RATE_LIMITER_MAX'),
            ttl: seconds(config.getOrThrow<number>('LONG_RATE_LIMITER_TLL')),
          },
        ],
        storage: new ThrottlerStorageRedisService(
          new Redis({
            port: config.getOrThrow<number>('REDIS_PORT'),
            host: config.getOrThrow<string>('REDIS_HOST'),
            db: config.getOrThrow<number>('REDIS_USER_DB'),
            password: config.getOrThrow<string>('REDIS_PASSWORD'),
            keyPrefix: config.getOrThrow<string>('REDIS_PREFIX'),
          })
        ),
      }),
    }),
  ],
})
export class RateLimitModule {}
