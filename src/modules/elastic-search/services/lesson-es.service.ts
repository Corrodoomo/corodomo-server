import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { BaseElasticsearchService } from './base-elastic-search.service';

@Injectable()
export class LessonEsService extends BaseElasticsearchService {
  constructor(protected readonly elasticsearchService: ElasticsearchService) {
    super(elasticsearchService, 'lessons');
  }

  /**
   * Delete document
   * @param id
   * @returns
   */
  public deleteByLessonId(lessonId: string) {
    return this.deleteByQuery({
      term: {
        'id.keyword': lessonId, // Điều kiện xóa theo lesson_id
      },
    });
  }
}
