import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

import { JwtService } from './jwt.service';

@Global()
@Module({
  imports: [
    NestJwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: () => ({
        global: true,
        verifyOptions: {
          algorithms: ['RS256'], // Xác minh token với RS256
        },
      }),
      global: true,
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
