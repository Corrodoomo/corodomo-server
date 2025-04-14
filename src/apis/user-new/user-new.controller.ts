import { Controller } from '@nestjs/common';

import { ApiGet } from '@common/decorators';
import { ApiOkResponseExample } from '@common/decorators/example.decorator';
import { Authorized } from '@common/guards/authorized.guard';
import { UserNewMapper } from '@common/mappers/user.mapper';

import { UserNewService } from './user-new.service';

@Controller('users')
export class UserNewController {
  constructor(private readonly userNewService: UserNewService) {}

  @ApiGet('profile')
  @ApiOkResponseExample(UserNewMapper)
  async get(@Authorized('id') id: string) {
    return this.userNewService.get(id);
  }
}
