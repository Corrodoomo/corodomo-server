import { UserNewsRepository } from '@app/apis/user-new/user-new.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { Messages } from '@common/enums';
import { BryptService } from '@common/services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userNewsRepository: UserNewsRepository,
    private readonly brptService: BryptService
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  // Validate user
  async validate(email: string, password: string) {
    // Check if user exists
    const user = await this.userNewsRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException(Messages.INVALID_EMAIL_OR_PASSWORD);

    // Check if password is correct
    const isPasswordMatched = await this.brptService.compare(password, user.password);
    if (!isPasswordMatched) throw new UnauthorizedException(Messages.INVALID_EMAIL_OR_PASSWORD);

    console.log('🐖 ~ validate:', user, isPasswordMatched);

    return user;
  }
}
