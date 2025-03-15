import { Body, Controller } from '@nestjs/common';

import { Post } from '@common/decorators';
import { SignedInUserDto, SignedUpUserDto, SignInUserDto } from '@common/dtos/user.dto';

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
}
