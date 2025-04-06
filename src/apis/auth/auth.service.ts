import { CreateUserDto } from '@app/apis/user-new/dtos/create-user.dto';
import { UserNewsRepository } from '@app/apis/user-new/user-new.repository';
import { UserNewService } from '@app/apis/user-new/user-new.service';
import { User } from '@modules/database/entities';
import { JwtService } from '@modules/jwt';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

import { options } from '@common/constants/cookie';
import { Messages } from '@common/enums';
import { BryptService } from '@common/services';
import { CookieService } from '@common/services/cookie.service';
import { SessionService } from '@common/services/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userNewsService: UserNewService,
    private readonly userNewsRepository: UserNewsRepository,
    private readonly jwtService: JwtService,
    private readonly brptService: BryptService,
    private readonly cookieService: CookieService,
    private readonly sessionService: SessionService,
    private readonly configService: ConfigService
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
    const { accessToken, refreshToken } = await this.generateToken(user.id, user.email, user.role);

    // Set cookies
    this.cookieService.setCookie(response, 'accessToken', accessToken, options);
    this.cookieService.setCookie(response, 'refreshToken', refreshToken, options);

    // Save session
    await this.sessionService.saveSession(request, user);

    response.send({ message: 'Login successful' });
  }

  public async refresh(user: User, response: Response) {
    const { accessToken, refreshToken } = await this.generateToken(user.id, user.email, user.role);

    // Set cookies
    this.cookieService.setCookie(response, 'accessToken', accessToken, options);
    this.cookieService.setCookie(response, 'refreshToken', refreshToken, options);

    response.send({ message: 'Refresh successful' });
  }

  public async logout(request: Request, response: Response) {
    await this.sessionService.destroySession(request, this.configService);
    response.send({ message: 'Logout successful' });
  }

  // Generate token
  public async generateToken(id: string, email: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAccessToken({ id, email, role }),
      this.jwtService.signRefreshToken({ id, email, role }),
    ]);

    return { accessToken, refreshToken };
  }

  // Validate local user
  public async validateLocalUser(email: string, password: string) {
    const user = await this.userNewsRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException(Messages.INVALID_EMAIL_OR_PASSWORD);
    const isPasswordMatched = this.brptService.compare(password, user.password);
    if (!isPasswordMatched) throw new UnauthorizedException(Messages.INVALID_EMAIL_OR_PASSWORD);

    return user;
  }

  public async validateJWTUser(userId: string) {
    const user = await this.userNewsRepository.findUserById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    const curentUser = { id: user.id, email: user.email, role: user.role };
    return curentUser;
  }

  public async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userNewsRepository.findUserById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    const isRefreshTokenMatched = await this.jwtService.verifyRefreshToken(refreshToken);
    if (!isRefreshTokenMatched) throw new UnauthorizedException('Invalid refresh token');

    const curentUser = { id: user.id, email: user.email, role: user.role };
    return curentUser;
  }
}
