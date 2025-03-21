import { BaseElasticsearchService } from './base-elastic-search.service';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class LessonEsService extends BaseElasticsearchService {
	constructor(protected readonly elasticsearchService: ElasticsearchService) {
		super(elasticsearchService, 'lessons');
	}
}
