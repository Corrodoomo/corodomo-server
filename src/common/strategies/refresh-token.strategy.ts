import { CacheService } from '@modules/cache/cache.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Messages } from '@common/enums';
import { JWTPayLoad } from '@common/types/jwt-payload.type';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req.body.refreshToken]),
      secretOrKey: configService.getOrThrow('REFRESH_SECRET_KEY'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: SystemRequest, payload: JWTPayLoad) {
    // Check accessToken token in Redis
    const session = await this.cacheService.prefix(payload.id).get(req.accessToken);

    // Check refresh token in Redis
    if (session.refreshToken !== req.body.refreshToken) {
      throw new UnauthorizedException(Messages.TOKEN_NOT_FOUND);
    }

    // Delete expire date option
    delete payload.iat;
    delete payload.exp;

    // Return user
    return payload;
  }
}
