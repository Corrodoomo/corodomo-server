import { UserCacheService } from '@modules/cache/user-cache.service';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { BryptService } from '@common/services';

import { UserController } from './user.controller';
import { UsersRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [],
  exports: [UserService],
  controllers: [UserController],
  providers: [
    UserService,
    UserCacheService,
    UsersRepository,
    {
      provide: BryptService,
      useFactory(configService: ConfigService) {
        return new BryptService(configService);
      },
      inject: [ConfigService],
    },
  ],
})
export class UserModule {}
