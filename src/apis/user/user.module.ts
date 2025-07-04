import { UserRepository } from '@app/apis/user/user.repository';
import { PricingPlanRepository } from '@modules/pricing-plan/pricing-plan.repository';
import { RoleRepository } from '@modules/role/role.repository';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { BryptService } from '@common/services';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    {
      provide: BryptService,
      useFactory(configService: ConfigService) {
        return new BryptService(configService);
      },
      inject: [ConfigService],
    },
    PricingPlanRepository,
    RoleRepository,
  ],
  exports: [
    UserService,
    UserRepository,
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
