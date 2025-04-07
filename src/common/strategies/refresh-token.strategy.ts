import { UserNewsRepository } from '@app/apis/user-new/user-new.repository';
import { JwtService } from '@modules/jwt';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWTPayLoad } from '@common/types/jwt-payload.type';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userNewsRepository: UserNewsRepository,
    private readonly jwtService: JwtService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req.cookies?.refreshToken]),
      secretOrKey: configService.getOrThrow('REFRESH_SECRET_KEY'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JWTPayLoad) {
    const { id } = payload;

    // Get refresh token from cookies
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

    // Check if user exists
    const user = await this.userNewsRepository.findUserById(id);
    if (!user) throw new UnauthorizedException('User not found');

    // Check if refresh token is valid
    const isRefreshTokenMatched = await this.jwtService.verifyRefreshToken(refreshToken);
    if (!isRefreshTokenMatched) throw new UnauthorizedException('Invalid refresh token');

    // Return user
    const curentUser = { id: user.id, email: user.email, role: user.role };
    return curentUser;
  }
}
