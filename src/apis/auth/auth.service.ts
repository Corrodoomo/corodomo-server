import { CreateUserDto } from '@app/apis/user/dtos/create-user.dto';
import { UserRepository } from '@app/apis/user/user.repository';
import { UserService } from '@app/apis/user/user.service';
import { UserCacheService } from '@modules/cache/user-cache.service';
import { JwtService } from '@modules/jwt';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Messages } from '@common/enums';
import { AuthMetadataMapper } from '@common/mappers/auth.mapper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly cacheService: UserCacheService
  ) {}

  // Register user
  @Transactional()
  public async registerUser(body: CreateUserDto) {
    const user = await this.userRepository.findByEmail(body.email);
    if (user) throw new ConflictException(Messages.USER_ALREADY_EXIST);
    return this.userService.create(body);
  }

  /**
   * Sign In with Cookie Http Only
   * @param user
   * @returns
   */
  public async signIn(user: AuthMetadataMapper) {
    // Get current sesson
    const duplicated = await this.cacheService.get(user.id);

    // Error if session duplicated
    if (duplicated) {
      throw new UnauthorizedException(Messages.DUPLICATED_SESSION);
    }

    // Generate access token and refresh token
    const { accessToken, refreshToken } = await this.jwtService.generateToken(user);

    // Save token to cache
    await this.cacheService.setItem(user.id, {
      accessToken,
      refreshToken,
      createdAt: new Date().toISOString(),
    });

    // Send access token and refresh token to middleware interceptor
    return { accessToken, refreshToken };
  }

  public async refresh(user: AuthMetadataMapper) {
    // Generate access token and refresh token
    const { accessToken, refreshToken } = await this.jwtService.generateToken(user);

    // Save token to cache
    await this.cacheService.setItem(user.id, {
      accessToken,
      refreshToken,
      createdAt: new Date().toISOString(),
    });

    // Send access token and refresh token to middleware interceptor
    return { accessToken, refreshToken };
  }

  /**
   * Logout user from system
   * @param user
   * @returns
   */
  public async logout(user: AuthMetadataMapper) {
    // Delete token from cache
    await this.cacheService.del(user.id);

    // Return message
    return { message: 'Logout successful' };
  }
}
