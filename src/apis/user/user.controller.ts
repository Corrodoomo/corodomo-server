import { Body, Controller, Req } from '@nestjs/common';

import { Post, Roles } from '@common/decorators';
import { SignedInUserDto, SignedUpUserDto, SignInUserDto } from '@common/dtos';
import { SystemRoles } from '@common/enums';
import { Request } from '@common/models';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signin', { auth: false, model: SignedInUserDto })
  signIn(@Body() body: SignInUserDto) {
    return this.userService.signIn(body.email, body.password);
  }

  @Post('signup', { auth: false, model: SignedUpUserDto })
  signUp(@Body() body: SignInUserDto) {
    return this.userService.signUp(body.email, body.password);
  }

  @Post('signout', { model: SignedUpUserDto })
  @Roles([SystemRoles.LEARNER])
  signOut(@Req() request: Request) {
    return this.userService.signOut(request.user.id);
  }

  @Post('refresh', { model: SignedUpUserDto })
  @Roles([SystemRoles.LEARNER])
  refresh(@Req() request: Request) {
    return this.userService.refresh(request.user.id);
  }
}
