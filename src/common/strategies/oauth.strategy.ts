import { UserRepository } from '@app/apis/user/user.repository';
import { UserService } from '@app/apis/user/user.service';
import { User } from '@modules/database/entities';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';
import { isEmpty } from 'lodash';
import { Strategy } from 'passport-custom';

import { Messages } from '@common/enums';
import { AuthMetadataMapper } from '@common/mappers/auth.mapper';

@Injectable()
export class OAuthStrategy extends PassportStrategy(Strategy, 'oauth-jwt') {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService
  ) {
    super();
  }

  async validate(req: SystemRequest) {
    // Get auth provider from request params
    const { authProvider } = req.params;

    // Init user
    let user: User | null = null;

    // Validate Google ID Token
    if (authProvider === 'google') {
      user = await this.verifyGoogle(req.body.idToken);
    }

    // Validate Google ID Token
    if (authProvider === 'github') {
      user = await this.verifyGithub(req.body.idToken);
    }

    // Error if user is not found
    if (isEmpty(user)) {
      throw new UnauthorizedException(Messages.OAUTH_FAILED);
    }

    // Metadata
    const metadata = await this.userRepository.getUserMetadata(user.id);

    // Return user
    return new AuthMetadataMapper(metadata);
  }

  /**
   * Verify Google
   * @param idToken
   * @returns
   */
  async verifyGoogle(idToken: string): Promise<any> {
    // Create client
    const client = new OAuth2Client(this.configService.getOrThrow('GOOGLE_CLIENT_ID')); // Replace with your Google Client ID

    // Verify id token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: this.configService.getOrThrow('GOOGLE_CLIENT_ID'), // Client ID của bạn
    });

    // Decoded token
    const payload = ticket.getPayload();

    // Error if paylod invalid
    if (isEmpty(payload)) {
      throw new UnauthorizedException(Messages.OAUTH_FAILED);
    }

    // Detructering payload
    const { email, picture, name } = payload;

    // Validate required fields
    const user = await this.userRepository.findOne({ cache: true, where: { email: payload?.email } });

    // If user not found, create new user
    if (isEmpty(user)) {
      return this.userService.create({
        email,
        name,
        avatarUrl: picture,
        authProvider: 'google',
        emailVerified: true,
      });
    }

    // Return user
    return user;
  }

  /**
   * Verify Github
   * @param idToken
   * @returns
   */
  async verifyGithub(idToken: string): Promise<any> {
    // Get profile
    const profile: any = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    // Email prefix
    const email = `${profile.data.login}@github.com`;

    // Validate required fields
    const user = await this.userRepository.findOne({ cache: true, where: { email } });

    // If user not found, create new user
    if (isEmpty(user)) {
      return this.userService.create({
        email,
        name: profile.data.name,
        avatarUrl: profile.data.avatar_url,
        authProvider: 'github',
        emailVerified: true,
      });
    }

    // Return user
    return user;
  }
}
