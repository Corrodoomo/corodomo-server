import { UserCacheService } from '@modules/cache/user-cache.service';
import { JwtService } from '@modules/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { USER_TOKEN } from '@common/constants/token';
import { Messages } from '@common/enums';
import { JWTPayLoad } from '@common/types/jwt-payload.type';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly cacheService: UserCacheService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req.cookies.refreshToken]),
      secretOrKey: configService.getOrThrow('REFRESH_SECRET_KEY'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JWTPayLoad) {
    // Get refresh token from cookies
    const refreshToken = req.cookies.refreshToken;

    //Check refresh token in Redis
    await this.cacheService.validateToken(payload.id, USER_TOKEN.REFRESH_TOKEN, refreshToken);

    // Check if refresh token is valid
    const isRefreshTokenMatched = this.jwtService.verifyRefreshToken(refreshToken);
    if (!isRefreshTokenMatched) throw new UnauthorizedException(Messages.INVALID_REFRESH_TOKEN);

    // Delete expire date option
    delete payload.iat;
    delete payload.exp;

    // Return user
    return payload;
  }
}
