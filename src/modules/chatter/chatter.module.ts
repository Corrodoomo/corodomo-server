import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ChatterService } from './chatter.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.getOrThrow('CHATTER_API_URL'),
        timeout: configService.getOrThrow('CHATTER_HTTP_TIMEOUT'),
        maxRedirects: configService.getOrThrow('CHATTER_MAX_REDIRECTS'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [ChatterService],
  providers: [ChatterService],
})
export class ChatterModule {}
