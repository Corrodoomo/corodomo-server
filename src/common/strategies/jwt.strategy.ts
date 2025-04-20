import { UserCacheService } from '@modules/cache/user-cache.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { USER_TOKEN } from '@common/constants/token';
import { JWTPayLoad } from '@common/types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly cacheService: UserCacheService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies.accessToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('ACCESS_SECRET_KEY'),
      passReqToCallback: true,
    });
  }

  async validate(req: SystemRequest, payload: JWTPayLoad) {
    const { id } = payload;

    // Get accessToken token from cookies
    const accessToken = req.cookies.accessToken;

    // Check accessToken token in Redis
    await this.cacheService.validateToken(id, USER_TOKEN.ACCESS_TOKEN, accessToken);

    // Return decoded payload
    return payload;
  }
}
