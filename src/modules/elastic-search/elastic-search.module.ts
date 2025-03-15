import { LessonElasticSearchService } from './services/lesson-es.service';
import { ConfigModule } from '@modules/config/config.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchModule as BaseElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
	imports: [
		BaseElasticsearchModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				node: configService.getOrThrow('ELASTICSEARCH_NODE'),
				auth: {
					username: configService.getOrThrow('ELASTICSEARCH_USERNAME'),
					password: configService.getOrThrow('ELASTICSEARCH_PASSWORD'),
				},
			}),
			inject: [ConfigService],
		}),
	],
	exports: [LessonElasticSearchService],
	providers: [LessonElasticSearchService],
})
export class ElasticSearchModule {}
