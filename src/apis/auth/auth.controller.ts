import { CreateUserDto } from '@app/apis/user/dtos/create-user.dto';
import { Body, Controller, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

import { ApiPost } from '@common/decorators';
import { ApiOkInsertResultExample, ApiOkResponseExample } from '@common/decorators/example.decorator';
import { Public } from '@common/decorators/public-route.decorator';
import { SignInUserDto } from '@common/dtos';
import { Authorized } from '@common/guards/authorized.guard';
import { LocalAuthGuard } from '@common/guards/local-auth.guard';
import { RefreshAuthGuard } from '@common/guards/refresh-auth.guard';
import { ClearSessionInterceptor } from '@common/interceptors/clear-session.interceptor';
import { InitializeSessionInterceptor } from '@common/interceptors/initialize-session.interceptor';
import { RefreshSessionInterceptor } from '@common/interceptors/refresh-session.interceptor';
import { AuthMetadataMapper } from '@common/mappers/auth.mapper';
import { AuthUserMapper, SignedUpUserMapper } from '@common/mappers/user.mapper';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiPost('signup')
  @ApiOkInsertResultExample(SignedUpUserMapper)
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Public()
  @ApiPost('signin')
  @ApiOkResponseExample(AuthUserMapper)
  @ApiBody({
    type: SignInUserDto,
  })
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(InitializeSessionInterceptor)
  signIn(@Authorized() user: AuthMetadataMapper, @Req() request: SystemRequest) {
    return this.authService.signIn(user, request);
  }

  @Public()
  @ApiPost('token')
  @ApiOkResponseExample(AuthUserMapper)
  @ApiBody({
    type: SignInUserDto,
  })
  @UseGuards(LocalAuthGuard)
  token(@Authorized() user: AuthMetadataMapper, @Req() request: SystemRequest) {
    return this.authService.signIn(user, request);
  }

  @Public()
  @ApiPost('refresh')
  @ApiOkResponseExample(AuthUserMapper)
  @UseGuards(RefreshAuthGuard)
  @UseInterceptors(RefreshSessionInterceptor)
  refresh(@Authorized() user: AuthMetadataMapper, @Req() request: SystemRequest) {
    return this.authService.refresh(user, request.cookies.idToken);
  }

  @ApiPost('signout')
  @ApiOkResponseExample(AuthUserMapper)
  @UseInterceptors(ClearSessionInterceptor)
  logout(@Authorized() user: AuthMetadataMapper, @Req() request: SystemRequest) {
    return this.authService.logout(user, request.cookies.idToken);
  }
}
