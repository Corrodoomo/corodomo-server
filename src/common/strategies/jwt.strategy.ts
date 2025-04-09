import { UserNewsRepository } from '@app/apis/user-new/user-new.repository';
import { UserCacheService } from '@modules/cache/user-cache.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { USER_TOKEN } from '@common/constants/token';
import { Messages } from '@common/enums';
import { JWTPayLoad } from '@common/types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userNewsRepository: UserNewsRepository,
    private readonly cacheService: UserCacheService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req.cookies?.accessToken]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('ACCESS_SECRET_KEY'),
      passReqToCallback: true,
    });
  }

  async validate(payload: JWTPayLoad, req: Request) {
    const { id } = payload;

    // Get accessToken token from cookies
    const accessToken = req.cookies?.accessToken;

    //Check accessToken token in Redis
    await this.cacheService.validateToken(id, USER_TOKEN.ACCESS_TOKEN, accessToken);

    // Check if user exists
    const user = await this.userNewsRepository.findUserById(id);
    if (!user) throw new UnauthorizedException(Messages.USER_NOT_FOUND);
    const curentUser = { id: user.id, email: user.email, role: user.role };

    return curentUser;
  }
}
