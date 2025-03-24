import { AuthService } from '@app/apis/auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { Messages } from '@common/enums';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateLocalUser(email, password);
    if (!user) {
      throw new UnauthorizedException(Messages.INVALID_EMAIL_OR_PASSWORD);
    }
    return user;
  }
}
