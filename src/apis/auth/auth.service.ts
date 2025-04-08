import { CreateUserDto } from '@app/apis/user-new/dtos/create-user.dto';
import { UserNewsRepository } from '@app/apis/user-new/user-new.repository';
import { UserNewService } from '@app/apis/user-new/user-new.service';
import { UserCacheService } from '@modules/cache/user-cache.service';
import { User } from '@modules/database/entities';
import { JwtService } from '@modules/jwt';
import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

import { CookieService } from '@common/services/cookie.service';
import { SessionService } from '@common/services/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userNewsService: UserNewService,
    private readonly userNewsRepository: UserNewsRepository,
    private readonly jwtService: JwtService,
    private readonly cookieService: CookieService,
    private readonly sessionService: SessionService,
    private readonly configService: ConfigService,
    private readonly cacheService: UserCacheService
  ) {}

  // Register user
  public async registerUser(body: CreateUserDto) {
    const user = await this.userNewsRepository.findByEmail(body.email);
    if (user) throw new ConflictException('User already exists');
    return this.userNewsService.create(body);
  }

  // Sign in
  public async signIn(request: Request, response: Response) {
    const user = request.user as User;
    const { accessToken, refreshToken } = await this.jwtService.generateToken(user.id, user.email, user.role);

    // Set cookies
    this.cookieService.setHttpOnlyCookie(response, 'accessToken', accessToken);
    this.cookieService.setHttpOnlyCookie(response, 'refreshToken', refreshToken);

    // Save session
    await this.sessionService.saveSession(request, user);

    // Save token to cache
    await this.cacheService.setItem(
      user.id,
      JSON.stringify({
        accessToken,
        refreshToken,
        createdAt: new Date().toISOString(),
      })
    );

    response.send({ message: 'Login successful' });
  }

  public async refresh(user: User, response: Response) {
    const { accessToken, refreshToken } = await this.jwtService.generateToken(user.id, user.email, user.role);

    // Set cookies
    this.cookieService.setHttpOnlyCookie(response, 'accessToken', accessToken);
    this.cookieService.setHttpOnlyCookie(response, 'refreshToken', refreshToken);

    // Save token to cache
    await this.cacheService.setItem(
      user.id,
      JSON.stringify({
        accessToken,
        refreshToken,
        createdAt: new Date().toISOString(),
      })
    );

    response.send({ message: 'Refresh successful' });
  }

  public async logout(request: Request, response: Response) {
    await this.sessionService.destroySession(request, this.configService);

    //Clear cookie
    this.cookieService.clearCookie(response, 'accessToken');
    this.cookieService.clearCookie(response, 'refreshToken');

    response.send({ message: 'Logout successful' });
  }
}
