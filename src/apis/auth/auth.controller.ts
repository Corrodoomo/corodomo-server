import { CreateUserDto } from '@app/apis/user-new/dtos/create-user.dto';
import { Body, Controller } from '@nestjs/common';

import { ApiPost } from '@common/decorators';
import { ApiOkInsertResultExample } from '@common/decorators/example.decorator';
import { SignedUpUserMapper } from '@common/mappers/user.mapper';

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
}
