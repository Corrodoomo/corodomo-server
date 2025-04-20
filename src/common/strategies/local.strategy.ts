import { UserRepository } from '@app/apis/user/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { Messages } from '@common/enums';
import { BryptService } from '@common/services';
import { AuthMetadataMapper } from '@common/mappers/auth.mapper';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly brptService: BryptService
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  /**
   * Validate email and password
   * @param email 
   * @param password 
   * @returns 
   */
  async validate(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException(Messages.INVALID_EMAIL_OR_PASSWORD);

    // Check if password is correct
    const isPasswordMatched = await this.brptService.compare(password, user.password);
    if (!isPasswordMatched) throw new UnauthorizedException(Messages.INVALID_EMAIL_OR_PASSWORD);

    // Get user metadata as Role, Permission, Pricing Plan...
    const metadata = await this.userRepository.getUserMetadata(user.id)

    // Return metadata to save sesson
    return new AuthMetadataMapper(metadata);
  }
}
