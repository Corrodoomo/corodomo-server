import { UserCacheService } from '@modules/cache/user-cache.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Messages } from '@common/enums';
import { JWTPayLoad } from '@common/types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly cacheService: UserCacheService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('ACCESS_SECRET_KEY'),
      passReqToCallback: true,
    });
  }

  async validate(req: SystemRequest, payload: JWTPayLoad) {
    // Check accessToken token in Redis
    const [_, accessToken] = req.headers.authorization.split(' ');

    const session = await this.cacheService.existSession(accessToken);

    // Token Not found
    if (session.accessToken !== accessToken) {
      throw new UnauthorizedException(Messages.TOKEN_NOT_FOUND);
    }

    // Delete expire date option
    delete payload.iat;
    delete payload.exp;

    // Return decoded payload
    return payload;
  }
}
