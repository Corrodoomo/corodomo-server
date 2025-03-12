import { UserCacheService } from '@modules/cache/user-cache.service';
import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UsersRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, UserCacheService, UsersRepository],
})
export class UserModule {}
