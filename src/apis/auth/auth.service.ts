import { CreateUserDto } from '@app/apis/user/dtos/create-user.dto';
import { UserRepository } from '@app/apis/user/user.repository';
import { UserService } from '@app/apis/user/user.service';
import { UserCacheService } from '@modules/cache/user-cache.service';
import { JwtService } from '@modules/jwt';
import { MqttService } from '@modules/mqtt/mqtt.service';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Messages } from '@common/enums';
import { AuthMetadataMapper } from '@common/mappers/auth.mapper';
import { WebSession } from '@common/utils/session.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly cacheService: UserCacheService,
    private readonly mqttService: MqttService
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
  public async signIn(user: AuthMetadataMapper, request: SystemRequest) {
    // Get current sesson
    const duplicated = await this.cacheService.getJsonItem<string[]>(user.id);

    // Generate access token and refresh token
    const { idToken, accessToken, refreshToken } = await this.jwtService.generateToken(user);

    // Get user agent from request
    const userAgent = WebSession.getSessionMetadata(request);

    // Save token to cache
    // Case session duplicated
    if (duplicated) {
      // Sau do handle thông báo đến device chính nếu có người lạ đăng nhập ở đây
      this.mqttService.notifyDuplicatedSession({
        id: user.id,
        userAgent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    // Save session by id token
    await this.cacheService.setSession(idToken, {
      id: user.id,
      userAgent,
      accessToken,
      refreshToken,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Save session by user id to check duplicated
    await this.cacheService.setSessionDevices(user.id, [...(duplicated || []), idToken]);

    // Send access token and refresh token to middleware interceptor
    return { accessToken, refreshToken, idToken };
  }

  public async refresh(user: AuthMetadataMapper, idToken: string) {
    // Generate access token and refresh token
    const { accessToken, refreshToken } = await this.jwtService.generateToken(user);

    // Get session data
    const session = await this.cacheService.existSession(idToken);
    // Save session by id token
    await this.cacheService.setSession(idToken, {
      ...session,
      accessToken,
      refreshToken,
      updatedAt: new Date().toISOString(),
    });

    throw new UnauthorizedException();

    // Send access token and refresh token to middleware interceptor
    return { accessToken, refreshToken };
  }

  /**
   * Logout user from system
   * @param user
   * @returns
   */
  public async logout(user: AuthMetadataMapper, idToken: string) {
    // Get current sesson
    const duplicated = await this.cacheService.getJsonItem<string[]>(`session_devices_${user.id}`);

    // Count number of sessions
    if (duplicated) {
      console.log('vao day 1');
      if (duplicated.length === 1) {
        // Delete token from cache
        await this.cacheService.del(`session_devices_${user.id}`);
      } else {
        // Delete from session by devices
        await this.cacheService.setSessionDevices(
          user.id,
          duplicated.filter((item) => item !== idToken)
        );
      }

      // Save token to cache
      await this.cacheService.del(`session_${idToken}`);
    }

    // Return message
    return { message: 'Logout successful' };
  }
}
