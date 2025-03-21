import { UserCacheService } from '@modules/cache/user-cache.service';
import { JwtService } from '@modules/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';

import { SignedInUserDto, SignedUpUserDto } from '@common/dtos/user.dto';
import { Messages } from '@common/enums';
import { BryptService } from '@common/services';

import { UsersRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly cacheService: UserCacheService,
    private readonly bryptService: BryptService
  ) {}

  /**
   * Sign in
   * @param email
   * @param password
   * @returns
   */
  public async signIn(email: string, password: string): Promise<SignedInUserDto> {
    // Get user by email
    const user = await this.userRepository.findByEmail(email);
    // Error if user invalid
    if (isEmpty(user)) {
      throw new BadRequestException(Messages.INVALID_EMAIL_OR_PASSWORD);
    }

    // Compare hash password
    const valid = await this.bryptService.compare(password, user.password);
    // Invalid password
    if (!valid) {
      throw new BadRequestException(Messages.INVALID_EMAIL_OR_PASSWORD);
    }

    // Check token if existed
    await this.cacheService.existToken(user.id);

    // Generate token
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAccessToken({ id: user.id, email: user.email, role: user.role }),
      this.jwtService.signRefreshToken({ id: user.id, email: user.email, role: user.role }),
    ]);

    // Save refresh token to cache
    await this.cacheService.setItem(user.id, `${accessToken}:${refreshToken}`);

    // Return result
    return { accessToken, refreshToken };
  }

  public async refresh(userId: string): Promise<SignedInUserDto> {
    // Get user by email
    const user = await this.userRepository.findOne({ where: { id: userId } });

    // Error if user invalid
    if (isEmpty(user)) {
      throw new BadRequestException(Messages.INVALID_EMAIL_OR_PASSWORD);
    }

    // Generate token
    const accessToken = await this.jwtService.signAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Save refresh token to cache
    const cachedToken = await this.cacheService.getItem(user.id);

    // Set new access token
    await this.cacheService.setItem(user.id, `${accessToken}:${cachedToken.refreshToken}`);

    // Return result
    return { accessToken };
  }

  /**
   * Sign up
   * @param email
   * @param password
   * @returns
   */
  public async signUp(email: string, password: string): Promise<SignedUpUserDto> {
    // Get user by email
    const user = await this.userRepository.findByEmail(email);

    // Duplicated error
    if (!isEmpty(user)) {
      throw new BadRequestException(Messages.DUPLICATED_EMAIL);
    }

    // Hash password
    const hash = await this.bryptService.hashPassword(password);

    // Insert user if valid
    const savedUser = await this.userRepository.save({ email, password: hash });

    // Return result
    return new SignedUpUserDto(savedUser.id);
  }

  /**
   * Sign out
   * @param userId
   */
  public async signOut(userId: string) {
    // Delete token on redis
    await this.cacheService.del(userId);

    return { message: 'Sign out successfully' };
  }
}
