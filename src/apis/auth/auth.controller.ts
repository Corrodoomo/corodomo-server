import { CreateUserDto } from '@app/apis/user-new/dtos/create-user.dto';
import { User } from '@modules/database/entities';
import { Body, Controller, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

import { ApiPost } from '@common/decorators';
import { ApiOkInsertResultExample, ApiOkResponseExample } from '@common/decorators/example.decorator';
import { SignInUserDto } from '@common/dtos';
import { Authorized } from '@common/guards/authorized.guard';
import { LocalAuthGuard } from '@common/guards/local-auth.guard';
import { SignedInUserMapper, SignedUpUserMapper } from '@common/mappers/user.mapper';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiPost('signup', {
    auth: false,
  })
  @ApiOkInsertResultExample(SignedUpUserMapper)
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @ApiPost('signin', {
    auth: false,
  })
  @ApiOkResponseExample(SignedInUserMapper)
  @ApiBody({
    type: SignInUserDto,
  })
  @UseGuards(LocalAuthGuard)
  signIn(@Authorized() user: User) {
    return this.authService.signIn(user);
  }
}
