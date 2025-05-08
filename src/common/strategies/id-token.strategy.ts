import { UserCacheService } from '@modules/cache/user-cache.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Messages } from '@common/enums';
import { JWTPayLoad } from '@common/types/jwt-payload.type';

@Injectable()
export class IdTokenStrategy extends PassportStrategy(Strategy, 'id-jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly cacheService: UserCacheService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: SystemRequest) => {
          return req.cookies.idToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('ACCESS_SECRET_KEY'),
      passReqToCallback: true,
    });
  }

  async validate(req: SystemRequest, payload: JWTPayLoad) {
    const { id } = payload;

    // Check accessToken token in Redis
    const existed = await this.cacheService.get(id);

    // Error if not found session
    if (existed) {
      throw new UnauthorizedException(Messages.SESSION_NOT_FOUND);
    }

    // Return decoded payload
    return payload;
  }
}
