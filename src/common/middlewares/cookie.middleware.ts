import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CookieMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const middleware = cookieParser(this.configService.getOrThrow('COOKIE_SECRET_KEY'));

    middleware(req, res, next);
  }
}
