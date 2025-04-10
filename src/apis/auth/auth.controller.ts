import { CreateUserDto } from '@app/apis/user-new/dtos/create-user.dto';
import { User } from '@modules/database/entities';
import { Body, Controller, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { ApiGet, ApiPost } from '@common/decorators';
import { CookieParser } from '@common/decorators/cookie.decorator';
import { ApiOkInsertResultExample, ApiOkResponseExample } from '@common/decorators/example.decorator';
import { Public } from '@common/decorators/public-route.decorator';
import { Roles } from '@common/decorators/roles.decorator';
import { SessionParser } from '@common/decorators/session.decorator';
import { UserAgent } from '@common/decorators/user-agent.decorator';
import { SignInUserDto } from '@common/dtos';
import { SystemRoles } from '@common/enums';
import { Authorized } from '@common/guards/authorized.guard';
import { LocalAuthGuard } from '@common/guards/local-auth.guard';
import { RefreshAuthGuard } from '@common/guards/refresh-auth.guard';
import { AuthUserMapper, SignedUpUserMapper } from '@common/mappers/user.mapper';
import { WebCookie } from '@common/utils/cookie.util';
import { WebSession } from '@common/utils/session.util';

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
  signIn(
    @Req() request: SystemRequest,
    @Res() response: SystemResponse,
    @UserAgent() userAgent: string,
    @CookieParser() cookie: WebCookie,
    @SessionParser() session: WebSession
  ) {
    return this.authService.signIn(request, response, userAgent, cookie, session);
  }

  @Public()
  @ApiGet('refresh')
  @ApiOkResponseExample(AuthUserMapper)
  @UseGuards(RefreshAuthGuard)
  refresh(@Authorized() user: User, @Res() response: Response, @CookieParser() cookie: WebCookie) {
    return this.authService.refresh(user, response, cookie);
  }

  @Public()
  @ApiPost('logout')
  @ApiOkResponseExample(AuthUserMapper)
  @UseGuards(RefreshAuthGuard)
  logout(@Req() request: Request, @Res() response: Response) {
    return this.authService.logout(request, response);
  }

  // Just for testing purpose
  @ApiGet('test')
  @Roles(SystemRoles.LEARNER)
  getTest(@Authorized() user: User) {
    return `This route is protected with ${user.email}`;
  }
}
