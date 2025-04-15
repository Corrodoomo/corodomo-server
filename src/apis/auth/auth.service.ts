import { CreateUserDto } from '@app/apis/user-new/dtos/create-user.dto';
import { UserNewsRepository } from '@app/apis/user-new/user-new.repository';
import { UserNewService } from '@app/apis/user-new/user-new.service';
import { UserCacheService } from '@modules/cache/user-cache.service';
import { User } from '@modules/database/entities';
import { JwtService } from '@modules/jwt';
import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { Transactional } from 'typeorm-transactional';

import { Messages } from '@common/enums';
import { CookieService } from '@common/services/cookie.service';
import { SessionService } from '@common/services/session.service';
import { WebCookie } from '@common/utils/cookie.util';
import { WebSession } from '@common/utils/session.util';

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
  @Transactional()
  public async registerUser(body: CreateUserDto) {
    const user = await this.userNewsRepository.findByEmail(body.email);
    if (user) throw new ConflictException(Messages.USER_ALREADY_EXIST);
    return this.userNewsService.create(body);
  }

  // Sign in
  public async signIn(
    request: SystemRequest,
    response: SystemResponse,
    userAgent: string,
    cookie: WebCookie,
    session: WebSession
  ) {
    const user = request.user;

    const { accessToken, refreshToken } = await this.jwtService.generateToken(user);

    // Set cookies
    cookie.setHttpOnlyCookie('accessToken', accessToken);
    cookie.setHttpOnlyCookie('refreshToken', refreshToken);

    // Get metadata
    const metadata = session.getSessionMetadata(userAgent);

    // Save session
    await session.saveSession(user, metadata);

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

    return null;
  }

  public async refresh(user: User, response: Response, cookie: WebCookie) {
    const { accessToken, refreshToken } = await this.jwtService.generateToken(user);

    // Set cookies
    cookie.setHttpOnlyCookie('accessToken', accessToken);
    cookie.setHttpOnlyCookie('refreshToken', refreshToken);

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
    return null;
  }

  public async logout(request: Request, response: Response) {
    await this.sessionService.destroySession(request, this.configService);

    //Clear cookie
    this.cookieService.clearCookie(response, 'accessToken');
    this.cookieService.clearCookie(response, 'refreshToken');

    response.send({ message: 'Logout successful' });
    return null;
  }
}
