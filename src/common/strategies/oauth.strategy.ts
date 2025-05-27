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

    let user: User | null = null;

    if (authProvider === 'google') {
      // Validate Google ID Token
      user = await this.verifyGoogle(req.body.idToken);
    }

    if (authProvider === 'github') {
      // Validate Google ID Token
      user = await this.verifyGithub(req.body.idToken);
    }

    if (isEmpty(user)) {
      throw new UnauthorizedException('OAUTH Invalid');
    }

    const metadata = await this.userRepository.getUserMetadata(user.id);

    // Return user
    return new AuthMetadataMapper(metadata);
  }

  async verifyGoogle(idToken: string): Promise<any> {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Replace with your Google Client ID

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID, // Client ID của bạn
    });

    const payload = ticket.getPayload();

    if (isEmpty(payload)) {
      throw new UnauthorizedException('OAUTH Invalid');
    }

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

    return user;
  }

  async verifyGithub(idToken: string): Promise<any> {
    const profile: any = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

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

    return user;
  }
}
