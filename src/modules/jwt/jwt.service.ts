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

  signAccessToken(user: Record<string, string>) {
    return this.jwtService.sign(user, {
      secret: this.configService.getOrThrow('ACCESS_SECRET_KEY'),
      expiresIn: this.configService.getOrThrow('ACCESS_SECRET_KEY_EXPIRE'),
      algorithm: 'HS256',
    });
  }

  signRefreshToken(user: Record<string, string>) {
    return this.jwtService.signAsync(user, {
      secret: this.configService.getOrThrow('REFRESH_SECRET_KEY'),
      expiresIn: this.configService.getOrThrow('REFRESH_SECRET_KEY_EXPIRE'),
    });
  }
}
