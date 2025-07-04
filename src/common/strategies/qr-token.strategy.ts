import { UserRepository } from '@app/apis/user/user.repository';
import { CacheService } from '@modules/cache/cache.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { isEmpty } from 'lodash';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Messages } from '@common/enums';

@Injectable()
export class QRStrategy extends PassportStrategy(Strategy, 'qr-code') {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req.body.qrToken]),
      secretOrKey: configService.getOrThrow('QR_CODE_KEY'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: SystemRequest) {
    // Check accessToken token in Redis
    const qrToken = await this.cacheService.prefix('qr_token').get(req.body.qrToken);

    // Check refresh token in Redis
    if (isEmpty(qrToken)) {
      throw new UnauthorizedException(Messages.TOKEN_NOT_FOUND);
    }

    // Destroy QR code token
    this.cacheService.prefix('qr_token').del(req.body.qrToken);

    // Check if user has already logged in with QR code
    req.user.userMetadata.authProvider = 'qr_code';

    // Return user
    return req.user;
  }
}
