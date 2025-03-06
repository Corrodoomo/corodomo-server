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
				node: 'http://localhost:9200',
				auth: {
					username: 'elastic',
					password: 'XlhktffqoSffrAq9MZf2DQ==',
				},
			}),
			inject: [ConfigService],
		}),
	],
	exports: [LessonElasticSearchService],
	providers: [
		LessonElasticSearchService,
		// {
		// 	provide: 'POST_SEARCH_SERVICE',
		// 	useFactory: (esService: ElasticsearchService) =>
		// 		new ElasticsearchCustomService(esService, 'post'),
		// 	inject: [ElasticsearchService],
		// },
	],
	// exports: ['POST_SEARCH_SERVICE'],
})
export class ElasticSearchModule {}
