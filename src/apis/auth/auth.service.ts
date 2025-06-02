import { UserRepository } from '@app/apis/user/user.repository';
import { UserService } from '@app/apis/user/user.service';
import { CacheService } from '@modules/cache/cache.service';
import { JwtService } from '@modules/jwt';
import { MqttService } from '@modules/mqtt/mqtt.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    private readonly cacheService: CacheService,
    private readonly mqttService: MqttService,
    private readonly configService: ConfigService
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
    const duplicated = await this.cacheService.keys(user.id);
    
    // Generate access token and refresh token
    const { idToken, accessToken, refreshToken } = await this.jwtService.generateToken(user);

    // Save token to cache
    // Case session duplicated
    if (duplicated.length) {
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
    await this.cacheService.prefix(user.id).set(
      accessToken,
      {
        id: user.id,
        userAgent: request.userAgent,
        accessToken,
        refreshToken,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      this.configService.getOrThrow('ACCESS_TOKEN_EXPIRE')
    );

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
   * @returns
   */
  public async refreshToken(user: AuthMetadataMapper) {
    // Generate access token and refresh token
    const { accessToken, refreshToken } = await this.jwtService.generateToken(user);

    // Save session by id token
    await this.cacheService.prefix(user.id).set(
      accessToken,
      {
        ...user,
        accessToken,
        refreshToken,
        updatedAt: new Date().toISOString(),
      },
      this.configService.getOrThrow('ACCESS_TOKEN_EXPIRE')
    );

    // Send access token and refresh token to middleware interceptor
    return { accessToken, refreshToken };
  }

  /**
   * Logout user from system
   * @param user
   * @returns
   */
  public async logout(user: AuthMetadataMapper, accessToken: string) {
    // Delete token to cache
    await this.cacheService.prefix(user.id).del(accessToken);

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
    this.cacheService.prefix('qr_token').set(qrToken, req.userAgent, this.configService.getOrThrow('QR_CODE_EXPIRE'));

    // Check if user has already logged in with QR code
    return new QRCodeMapper(qrToken, req.userAgent);
  }
}
