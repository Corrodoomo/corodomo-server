import { Policy } from '@modules/policy/policy.decorator';
import { Controller, Req } from '@nestjs/common';

import { ApiGet } from '@common/decorators';
import { ApiOkResponseExample } from '@common/decorators/example.decorator';
import { Authorized } from '@common/guards/authorized.guard';
import { ProfileMapper } from '@common/mappers/user.mapper';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiGet('profile')
  @Policy('read', 'users')
  @ApiOkResponseExample(ProfileMapper)
  async get(@Authorized('id') id: string, @Req() req: SystemRequest) {
    return this.userService.get(id, req.cookies.idToken);
  }
}
