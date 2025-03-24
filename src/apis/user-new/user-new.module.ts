import { UserNewsRepository } from '@app/apis/user-new/user-new.repository';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { BryptService } from '@common/services';

import { UserNewController } from './user-new.controller';
import { UserNewService } from './user-new.service';

@Module({
  controllers: [UserNewController],
  providers: [
    UserNewService,
    UserNewsRepository,
    {
      provide: BryptService,
      useFactory(configService: ConfigService) {
        return new BryptService(configService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [
    UserNewService,
    UserNewsRepository,
    {
      provide: BryptService,
      useFactory(configService: ConfigService) {
        return new BryptService(configService);
      },
      inject: [ConfigService],
    },
  ],
})
export class UserNewModule {}
