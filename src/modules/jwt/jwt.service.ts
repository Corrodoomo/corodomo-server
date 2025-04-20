import { AuthMetadataMapper } from '@common/mappers/auth.mapper';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly configService: ConfigService
  ) {}

  verifyAccessToken(token: string) {
    return this.jwtService.verify<Session>(token, {
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
    return this.jwtService.verify<Session>(token, {
      secret: this.configService.getOrThrow('REFRESH_SECRET_KEY'),
      algorithms: ['HS256'],
    });
  }

  signRefreshToken(user: AuthMetadataMapper) {
    return this.jwtService.signAsync(user, {
      secret: this.configService.getOrThrow('REFRESH_SECRET_KEY'),
      expiresIn: this.configService.getOrThrow('REFRESH_SECRET_KEY_EXPIRE'),
    });
  }

  /**
   * Generate token from AuthMetadataMapper
   * @param user 
   * @returns 
   */
  async generateToken(user: AuthMetadataMapper) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken({ ...user }),
      this.signRefreshToken({ ...user }),
    ]);

    return { accessToken, refreshToken };
  }
}
