import { UserNewModule } from '@app/apis/user-new/user-new.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { CookieService } from '@common/services/cookie.service';
import { SessionService } from '@common/services/session.service';
import { JwtStrategy } from '@common/strategies/jwt.strategy';
import { LocalStrategy } from '@common/strategies/local.strategy';
import { RefreshStrategy } from '@common/strategies/refresh-token.strategy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshStrategy, CookieService, SessionService],
  imports: [UserNewModule, PassportModule],
})
export class AuthModule {}
