import { CreateUserDto } from '@app/apis/user-new/dtos/create-user.dto';
import { User } from '@modules/database/entities';
import { Body, Controller, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';

import { ApiGet, ApiPost } from '@common/decorators';
import { ApiOkInsertResultExample, ApiOkResponseExample } from '@common/decorators/example.decorator';
import { Public } from '@common/decorators/public-route.decorator';
import { Roles } from '@common/decorators/roles.decorator';
import { SignInUserDto } from '@common/dtos';
import { SystemRoles } from '@common/enums';
import { Authorized } from '@common/guards/authorized.guard';
import { LocalAuthGuard } from '@common/guards/local-auth.guard';
import { RefreshAuthGuard } from '@common/guards/refresh-auth.guard';
import { SignedInUserMapper, SignedUpUserMapper } from '@common/mappers/user.mapper';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiPost('signup', {
    auth: false,
  })
  @ApiOkInsertResultExample(SignedUpUserMapper)
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Public()
  @ApiPost('signin', {
    auth: false,
  })
  @ApiOkResponseExample(SignedInUserMapper)
  @ApiBody({
    type: SignInUserDto,
  })
  @UseGuards(LocalAuthGuard)
  signIn(@Authorized() user: User, @Res() response: Response) {
    return this.authService.signIn(user, response);
  }

  @Public()
  @ApiGet('refresh', {
    auth: false,
  })
  @ApiBearerAuth()
  @UseGuards(RefreshAuthGuard)
  refresh(@Authorized() user: User) {
    return this.authService.refresh(user);
  }

  // Just for testing purpose
  @ApiGet('test', {
    auth: false,
  })
  // @ApiOkResponseExample(ProfiledUserMapper)
  @ApiBearerAuth()
  @Roles(SystemRoles.LEARNER)
  getTest(@Authorized() user: User) {
    return `This route is protected with ${user.email}`;
  }
}
