import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { BaseElasticsearchService } from './base-elastic-search.service';

@Injectable()
export class LessonRecentEsService extends BaseElasticsearchService {
  constructor(protected readonly elasticsearchService: ElasticsearchService) {
    super(elasticsearchService, 'lesson_recents');
  }
}
