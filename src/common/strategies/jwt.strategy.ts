import { CacheService } from '@modules/cache/cache.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Messages } from '@common/enums';
import { JWTPayLoad } from '@common/types/jwt-payload.type';
import { isEmpty } from 'lodash';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('ACCESS_SECRET_KEY'),
      passReqToCallback: true,
    });
  }

  async validate(req: SystemRequest, payload: JWTPayLoad) {
    // Get token in cache
    const session = await this.cacheService.prefix(payload.id).get(req.accessToken);

    // Token Not found
    if (isEmpty(session)) {
      throw new UnauthorizedException(Messages.TOKEN_NOT_FOUND);
    }

    // Delete expire date option
    delete payload.iat;
    delete payload.exp;

    // Return decoded payload
    return payload;
  }
}
