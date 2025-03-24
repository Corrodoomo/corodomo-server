import { UserNewModule } from '@app/apis/user-new/user-new.module';
import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserNewModule],
})
export class AuthModule {}
