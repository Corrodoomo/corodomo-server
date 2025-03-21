import { ConfigModule } from '@modules/config/config.module';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchModule as BaseElasticsearchModule } from '@nestjs/elasticsearch';

import { LessonEsService } from './services/lesson-es.service';
import { MinimapElasticSearchService } from './services/minimap-es.service';

const providers = [MinimapElasticSearchService, LessonEsService];

@Global()
@Module({
  imports: [
    BaseElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        node: configService.getOrThrow('ELASTIC_NODE'),
        auth: {
          username: configService.getOrThrow('ELASTIC_USERNAME'),
          password: configService.getOrThrow('ELASTIC_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [
    BaseElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        node: configService.getOrThrow('ELASTIC_NODE'),
        auth: {
          username: configService.getOrThrow('ELASTIC_USERNAME'),
          password: configService.getOrThrow('ELASTIC_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
    ...providers,
  ],
  providers,
})
export class ElasticSearchModule {}
