import { ExamEsService } from '@modules/elastic-search/services/exam-es.service';
import { Injectable } from '@nestjs/common';

import { PaginateQueryDto } from '@common/dtos/common.dto';

import { ExamRepository } from './exam.repository';

@Injectable()
export class ExamService {
  constructor(
    private readonly examRepository: ExamRepository,
    private readonly examEsService: ExamEsService
  ) {}

  /**
   * Search exam
   * @param userId
   * @returns
   */
  public async search(query: PaginateQueryDto) {
    const keyword = String(query.filter?.['keyword']);

    const should: any[] = [];
    const must: any[] = [];

    // Add condition If keyword existed
    if (keyword) {
      should.push(
        {
          match: {
            title: {
              query: keyword,
              fuzziness: 'AUTO',
            },
          },
        },
        {
          wildcard: {
            'title.keyword': {
              value: `${keyword}*`,
              case_insensitive: true,
            },
          },
        },
        {
          prefix: {
            title: {
              value: keyword,
            },
          },
        }
      );
    }

    // Add condition If type existed
    // 'type.keyword' to condition includes
    if (query.filter?.['type']) {
      must.push({ terms: { 'type.keyword': [String(query.filter?.['type'])] } });
    }
    
    // Search exams
    const exams = await this.examEsService.paginate(
      {
        query: {
          bool: {
            should,
            must,
          },
        },
      },
      {
        page: query.page,
        limit: query.limit,
      }
    );

    // Return result
    return exams;
  }
}
