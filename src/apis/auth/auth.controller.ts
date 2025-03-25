import { CreateUserDto } from '@app/apis/user-new/dtos/create-user.dto';
import { User } from '@modules/database/entities';
import { Body, Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { ApiGet, ApiPost } from '@common/decorators';
import { ApiOkInsertResultExample, ApiOkResponseExample } from '@common/decorators/example.decorator';
import { Public } from '@common/decorators/public-route.decorator';
import { SignInUserDto } from '@common/dtos';
import { Authorized } from '@common/guards/authorized.guard';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@common/guards/local-auth.guard';
import { ProfiledUserMapper, SignedInUserMapper, SignedUpUserMapper } from '@common/mappers/user.mapper';

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
  signIn(@Authorized() user: User) {
    return this.authService.signIn(user);
  }

  // Just for testing purpose
  @ApiGet('profile', {
    auth: false,
  })
  @ApiOkResponseExample(ProfiledUserMapper)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getProfile(@Authorized() user: User) {
    return user;
  }

  // Just for testing purpose
  @ApiGet('test', {
    auth: false,
  })
  // @ApiOkResponseExample(ProfiledUserMapper)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getTest(@Authorized() user: User) {
    return `This route is protected with ${user.email}`;
  }
}
