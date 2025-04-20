import { Controller } from '@nestjs/common';

import { ApiGet } from '@common/decorators';
import { ApiOkResponseExample } from '@common/decorators/example.decorator';
import { Authorized } from '@common/guards/authorized.guard';
import { ProfileMapper } from '@common/mappers/user.mapper';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiGet('profile')
  @ApiOkResponseExample(ProfileMapper)
  async get(@Authorized('id') id: string) {
    return this.userService.get(id);
  }
}
