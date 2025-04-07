import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisStore } from 'connect-redis';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as session from 'express-session';
import Redis from 'ioredis';

import { ms, StringValue } from '@common/utils/ms.util';
import { parseBoolean } from '@common/utils/parse-boolean.util';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  private redisClient: Redis;
  private sessionMiddleware: RequestHandler;

  constructor(private configService: ConfigService) {
    this.redisClient = new Redis({
      port: this.configService.getOrThrow<number>('REDIS_PORT'),
      host: this.configService.getOrThrow<string>('REDIS_HOST'),
      db: this.configService.getOrThrow<number>('SESSION_DB'),
      password: this.configService.getOrThrow<string>('REDIS_PASSWORD'),
    });

    this.sessionMiddleware = session({
      secret: this.configService.getOrThrow<string>('SESSION_SECRET'),
      name: this.configService.getOrThrow<string>('SESSION_NAME'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        domain: this.configService.getOrThrow<string>('SESSION_DOMAIN'),
        maxAge: ms(this.configService.getOrThrow<StringValue>('SESSION_MAX_AGE')),
        httpOnly: parseBoolean(this.configService.getOrThrow<string>('SESSION_HTTP_ONLY')),
        secure: parseBoolean(this.configService.getOrThrow<string>('SESSION_SECURE')),
        sameSite: 'lax',
      },
      store: new RedisStore({
        client: this.redisClient,
        prefix: this.configService.getOrThrow<string>('SESSION_PREFIX'),
      }),
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.sessionMiddleware(req, res, next);
  }
}
