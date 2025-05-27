import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { v4 } from 'uuid';

import { AuthMetadataMapper } from '@common/mappers/auth.mapper';
import { UserAgentMetadata } from '@common/types/session-metadata.type';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly configService: ConfigService
  ) {}

  verifyIdToken(token: string) {
    return this.jwtService.verify<TSession>(token, {
      secret: this.configService.getOrThrow('ID_TOKEN_SECRET_KEY'),
      algorithms: ['HS256'],
    });
  }

  signIdToken(user: Partial<TSession>) {
    return this.jwtService.sign(user, {
      secret: this.configService.getOrThrow('ID_TOKEN_SECRET_KEY'),
      expiresIn: this.configService.getOrThrow('ID_TOKEN_SECRET_KEY_EXPIRE'),
      algorithm: 'HS256',
    });
  }

  verifyAccessToken(token: string) {
    return this.jwtService.verify<AuthMetadataMapper>(token, {
      secret: this.configService.getOrThrow('ACCESS_SECRET_KEY'),
      algorithms: ['HS256'],
    });
  }

  signAccessToken(user: AuthMetadataMapper) {
    return this.jwtService.sign(user, {
      secret: this.configService.getOrThrow('ACCESS_SECRET_KEY'),
      expiresIn: this.configService.getOrThrow('ACCESS_SECRET_KEY_EXPIRE'),
      algorithm: 'HS256',
    });
  }

  verifyRefreshToken(token: string) {
    return this.jwtService.verify<AuthMetadataMapper>(token, {
      secret: this.configService.getOrThrow('REFRESH_SECRET_KEY'),
      algorithms: ['HS256'],
    });
  }

  signRefreshToken(user: AuthMetadataMapper) {
    return this.jwtService.signAsync(user, {
      secret: this.configService.getOrThrow('REFRESH_SECRET_KEY'),
      expiresIn: this.configService.getOrThrow('REFRESH_SECRET_KEY_EXPIRE'),
      algorithm: 'HS256',
    });
  }

  /**
   * Sign QR Code token
   * @description This token is used for QR Code login, it is signed with a different key and has a different expiration time.
   * @param userAgent
   * @returns
   */
  signQRToken(userAgent: UserAgentMetadata) {
    return this.jwtService.signAsync(
      {
        id: v4(),
        provider: 'qr_code',
        ...userAgent,
      },
      {
        secret: this.configService.getOrThrow('QR_CODE_KEY'),
        expiresIn: this.configService.getOrThrow('QR_CODE_EXPIRE'),
        algorithm: 'HS256',
      }
    );
  }

  /**
   * Generate token from AuthMetadataMapper
   * @param user
   * @returns
   */
  async generateToken(user: AuthMetadataMapper) {
    const [idToken, accessToken, refreshToken] = await Promise.all([
      this.signIdToken({ id: user.id, name: user.name, avatarUrl: user.avatarUrl, email: user.email }),
      this.signAccessToken({ ...user }),
      this.signRefreshToken({ ...user }),
    ]);

    return { idToken, accessToken, refreshToken };
  }
}
