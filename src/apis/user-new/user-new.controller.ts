import { Controller } from '@nestjs/common';
import { UserNewService } from './user-new.service';

@Controller('user-new')
export class UserNewController {
  constructor(private readonly userNewService: UserNewService) {}
}
