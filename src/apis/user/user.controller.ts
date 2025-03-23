import { Body, Controller, Req } from '@nestjs/common';

import { ApiPost, Roles } from '@common/decorators';
import { ApiOkInsertResultExample, ApiOkResponseExample } from '@common/decorators/example.decorator';
import { SignedInUserDto, SignInUserDto, SignedUpUserDto, SignedOutUserDto, RefreshUserDto } from '@common/dtos';
import { SystemRoles } from '@common/enums';
import { Request } from '@common/models';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiPost('signin', { auth: false })
  @ApiOkResponseExample(SignedInUserDto)
  signIn(@Body() body: SignInUserDto) {
    return this.userService.signIn(body.email, body.password);
  }

  @ApiPost('signup', { auth: false })
  @ApiOkInsertResultExample(SignedUpUserDto)
  signUp(@Body() body: SignInUserDto) {
    return this.userService.signUp(body.email, body.password);
  }

  @ApiPost('signout')
  @Roles([SystemRoles.LEARNER])
  @ApiOkResponseExample(SignedOutUserDto)
  signOut(@Req() request: Request) {
    return this.userService.signOut(request.user.id);
  }

  @ApiPost('refresh')
  @Roles([SystemRoles.LEARNER])
  @ApiOkResponseExample(RefreshUserDto)
  refresh(@Req() request: Request) {
    return this.userService.refresh(request.user.id);
  }
}
