import { UserRepository } from '@app/apis/user/user.repository';
import { UserService } from '@app/apis/user/user.service';
import { UserCacheService } from '@modules/cache/user-cache.service';
import { JwtService } from '@modules/jwt';
import { MqttService } from '@modules/mqtt/mqtt.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { InsertResultDto, SignUpUserDto } from '@common/dtos';
import { Messages } from '@common/enums';
import { AuthMetadataMapper, QRCodeMapper } from '@common/mappers/auth.mapper';

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
  public async registerUser(body: SignUpUserDto) {
    // Check if user already exists
    const user = await this.userRepository.findByEmail(body.email);

    // If user already exists, throw conflict exception
    if (user) throw new ConflictException(Messages.USER_ALREADY_EXIST);

    // Create new user
    const savedUser = await this.userService.create({
      email: body.email,
      name: body.name,
      password: body.password,
    });

    // Return result
    return new InsertResultDto(
      {
        id: savedUser.id,
        email: savedUser.email,
        emailVerified: savedUser.emailVerified,
        updatedAt: savedUser.updatedAt,
        createdAt: savedUser.createdAt,
        name: savedUser.name,
      },
      1
    );
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

    // Save token to cache
    // Case session duplicated
    if (duplicated) {
      // Sau do handle thông báo đến device chính nếu có người lạ đăng nhập ở đây
      this.mqttService.notifyDuplicatedSession({
        id: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        message: 'duplicatedDevices',
        sentAt: new Date(),
        userAgent: request.userAgent,
      });
    }

    // Save session by id token
    await this.cacheService.setSession(accessToken, {
      id: user.id,
      userAgent: request.userAgent,
      accessToken,
      refreshToken,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Save session by user id to check duplicated
    await this.cacheService.setSessionDevices(user.id, [...(duplicated || []), accessToken]);

    // Send access token and refresh token to middleware interceptor
    return { accessToken, refreshToken, idToken };
  }

  /**
   * Sign In with QR Code
   * @param user
   * @param request
   * @returns
   */
  public async signInWithQR(user: AuthMetadataMapper, request: SystemRequest) {
    // Generate token for qr code
    const { accessToken, idToken, refreshToken } = await this.signIn(user, request);

    // Sau do handle thông báo đến device chính nếu có người lạ đăng nhập ở đây
    this.mqttService.notifyAuthQR(request.body.qrToken, { accessToken, idToken, refreshToken });

    // Send access token and refresh token to middleware interceptor
    return { message: 'Sign in with QR code successful' };
  }

  /**
   * Refresh token
   * @param user
   * @param authorization
   * @returns
   */
  public async refreshToken(user: AuthMetadataMapper, authorization: string) {
    // Generate access token and refresh token

    const { accessToken, refreshToken } = await this.jwtService.generateToken(user);

    // Get session data
    const [_, oldToken] = authorization.split(' ');
    const session = await this.cacheService.existSession(oldToken);

    // Save session by id token
    await this.cacheService.setSession(accessToken, {
      ...session,
      accessToken,
      refreshToken,
      updatedAt: new Date().toISOString(),
    });

    // Send access token and refresh token to middleware interceptor
    return { accessToken, refreshToken };
  }

  /**
   * Logout user from system
   * @param user
   * @returns
   */
  public async logout(user: AuthMetadataMapper, accessToken: string) {
    // Get current sesson
    const duplicated = await this.cacheService.getJsonItem<string[]>(`session_devices_${user.id}`);

    // Count number of sessions
    if (duplicated) {
      if (duplicated.length === 1) {
        // Delete token from cache
        await this.cacheService.del(`session_devices_${user.id}`);
      } else {
        // Delete from session by devices
        await this.cacheService.setSessionDevices(
          user.id,
          duplicated.filter((item) => item !== accessToken)
        );
      }
    }

    // Delete token to cache
    await this.cacheService.del(`session_${accessToken}`);

    // Return message
    return { message: 'Logout successful' };
  }

  /**
   * Get QR Code for login
   * @description This method generates a QR code token for the user to scan and log in.
   * @param user
   * @returns
   */
  public async getQRCode(req: SystemRequest) {
    // Generate QR code token
    const qrToken = await this.jwtService.signQRToken(req.userAgent);

    // Save QR code token to cache with user agent
    // Set expiration time for QR code token
    this.cacheService.set(`qr_token_${qrToken}`, JSON.stringify(req.userAgent), 60);

    // Check if user has already logged in with QR code
    return new QRCodeMapper(qrToken);
  }
}
