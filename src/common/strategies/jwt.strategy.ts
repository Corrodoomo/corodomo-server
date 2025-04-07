import { AuthService } from '@app/apis/auth/auth.service';
import { UserNewsRepository } from '@app/apis/user-new/user-new.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWTPayLoad } from '@common/types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly userNewsRepository: UserNewsRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req.cookies?.accessToken]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('ACCESS_SECRET_KEY'),
    });
  }

  async validate(payload: JWTPayLoad) {
    const { id } = payload;

    // Check if user exists
    const user = await this.userNewsRepository.findUserById(id);
    if (!user) throw new UnauthorizedException('User not found');
    const curentUser = { id: user.id, email: user.email, role: user.role };

    return curentUser;
  }
}
