import { Body, Controller, Req } from '@nestjs/common';

import { ApiPost, RolesOld } from '@common/decorators';
import { ApiOkInsertResultExample, ApiOkResponseExample } from '@common/decorators/example.decorator';
import { SignInUserDto } from '@common/dtos';
import { SystemRoles } from '@common/enums';
import {
  RefreshUserMapper,
  SignedInUserMapper,
  SignedOutUserMapper,
  SignedUpUserMapper,
} from '@common/mappers/user.mapper';
import { Request } from '@common/models';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiPost('signin', { auth: false })
  @ApiOkResponseExample(SignedInUserMapper)
  signIn(@Body() body: SignInUserDto) {
    return this.userService.signIn(body.email, body.password);
  }

  @ApiPost('signup', { auth: false })
  @ApiOkInsertResultExample(SignedUpUserMapper)
  signUp(@Body() body: SignInUserDto) {
    return this.userService.signUp(body.email, body.password);
  }

  @ApiPost('signout')
  @RolesOld([SystemRoles.LEARNER])
  @ApiOkResponseExample(SignedOutUserMapper)
  signOut(@Req() request: Request) {
    return this.userService.signOut(request.user.id);
  }

  @ApiPost('refresh')
  @RolesOld([SystemRoles.LEARNER])
  @ApiOkResponseExample(RefreshUserMapper)
  refresh(@Req() request: Request) {
    return this.userService.refresh(request.user.id);
  }
}
