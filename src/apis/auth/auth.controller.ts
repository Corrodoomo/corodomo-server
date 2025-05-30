import { Body, Controller, Req, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

import { ApiGet, ApiPost } from '@common/decorators';
import { ApiOkInsertResultExample, ApiOkResponseExample } from '@common/decorators/example.decorator';
import { Public } from '@common/decorators/public-route.decorator';
import { SignInOAuthDto, SignInQRCodeDto, SignInUserDto, SignUpUserDto } from '@common/dtos';
import { Authorized } from '@common/guards/authorized.guard';
import { LocalAuthGuard } from '@common/guards/local-auth.guard';
import { OAuthGuard } from '@common/guards/oauth.guard';
import { QRAuthGuard } from '@common/guards/qr-auth.guard';
import { RefreshAuthGuard } from '@common/guards/refresh-auth.guard';
import { AuthMetadataMapper } from '@common/mappers/auth.mapper';
import { AuthUserMapper, SignedUpUserMapper } from '@common/mappers/user.mapper';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiPost('signup')
  @ApiOkInsertResultExample(SignedUpUserMapper)
  registerUser(@Body() createUserDto: SignUpUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Public()
  @ApiPost('signin')
  @ApiOkResponseExample(AuthUserMapper)
  @ApiBody({
    type: SignInUserDto,
  })
  @UseGuards(LocalAuthGuard)
  signIn(@Authorized() user: AuthMetadataMapper, @Req() request: SystemRequest) {
    return this.authService.signIn(user, request);
  }

  @ApiPost('signin/qr_code')
  @ApiOkResponseExample(AuthUserMapper)
  @ApiBody({
    type: SignInQRCodeDto,
  })
  @UseGuards(QRAuthGuard)
  signInWithQR(@Authorized() user: AuthMetadataMapper, @Req() request: SystemRequest) {
    return this.authService.signInWithQR(user, request);
  }

  @Public()
  @ApiPost('signin/:authProvider')
  @ApiOkResponseExample(AuthUserMapper)
  @ApiBody({
    type: SignInOAuthDto,
  })
  @UseGuards(OAuthGuard)
  signInWithSSO(@Authorized() user: AuthMetadataMapper, @Req() request: SystemRequest) {
    return this.authService.signIn(user, request);
  }

  @Public()
  @ApiGet('qr_code')
  getQRCode(@Req() request: SystemRequest) {
    return this.authService.getQRCode(request);
  }

  @Public()
  @ApiPost('refresh_token')
  @ApiOkResponseExample(AuthUserMapper)
  @UseGuards(RefreshAuthGuard)
  refreshToken(@Authorized() user: AuthMetadataMapper) {
    return this.authService.refreshToken(user);
  }

  @ApiPost('signout')
  @ApiOkResponseExample(AuthUserMapper)
  logout(@Authorized() user: AuthMetadataMapper, @Req() request: SystemRequest) {
    return this.authService.logout(user, request.accessToken);
  }
}
