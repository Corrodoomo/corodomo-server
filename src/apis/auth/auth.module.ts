import { UserModule } from '@app/apis/user/user.module';
import { MqttService } from '@modules/mqtt/mqtt.service';
import { PricingPlanRepository } from '@modules/pricing-plan/pricing-plan.repository';
import { RoleRepository } from '@modules/role/role.repository';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from '@common/strategies/jwt.strategy';
import { LocalStrategy } from '@common/strategies/local.strategy';
import { OAuthStrategy } from '@common/strategies/oauth.strategy';
import { QRStrategy } from '@common/strategies/qr-token.strategy';
import { RefreshStrategy } from '@common/strategies/refresh-token.strategy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
    QRStrategy,
    OAuthStrategy,
    MqttService,
    RoleRepository,
    PricingPlanRepository,
  ],
  imports: [UserModule, PassportModule],
})
export class AuthModule {}
