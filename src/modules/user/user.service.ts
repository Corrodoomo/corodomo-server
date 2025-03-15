import { UserCacheService } from '@modules/cache/user-cache.service';
import { JwtService } from '@modules/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';

import { SignedInUserDto, SignedUpUserDto } from '@common/dtos/user.dto';
import { Messages } from '@common/enums';

import { UsersRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly cacheService: UserCacheService
  ) {}

  /**
   * Sign in
   * @param email
   * @param password
   * @returns
   */
  public async signIn(email: string, password: string): Promise<SignedInUserDto> {
    const user = await this.userRepository.findByEmail(email);

    if (isEmpty(user) || user.password !== password) {
      throw new BadRequestException(Messages.INVALID_EMAIL_OR_PASSWORD);
    }

    await this.cacheService.existToken(user.id);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAccessToken({ id: user.id, email: user.email, role: user.role }),
      this.jwtService.signRefreshToken({ id: user.id, email: user.email, role: user.role }),
    ]);

    // Save refresh token to cache
    await this.cacheService.setItem(user.id, `${accessToken}:${refreshToken}`);

    return { accessToken, refreshToken };
  }

  /**
   * Sign up
   * @param email
   * @param password
   * @returns
   */
  public async signUp(email: string, password: string): Promise<SignedUpUserDto> {
    const user = await this.userRepository.findByEmail(email);

    if (!isEmpty(user)) {
      throw new BadRequestException(Messages.DUPLICATED_EMAIL);
    }

    const savedUser = await this.userRepository.save({ email, password });

    return new SignedUpUserDto(savedUser.id);
  }

  /**
   * Sign out
   * @param userId
   */
  public async signOut(userId: string) {
    await this.cacheService.del(userId);

    return { message: 'Sign out successfully' };
  }
}
