import { ExamEsService } from '@modules/elastic-search/services/exam-es.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';

import { UpdateResultDto } from '@common/dtos';
import { PaginateQueryDto } from '@common/dtos/common.dto';
import { Messages } from '@common/enums';
import { DetailExamMapper } from '@common/mappers/exam.mapper';

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

    const must: any[] = [];

    // Add condition If keyword existed
    if (keyword) {
      must.push(
        {
          match: {
            title: {
              query: keyword,
              fuzziness: 'AUTO',
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

  /**
   * Get detail exam includes section parts and questions
   * @param examId
   * @returns
   */
  public async getDetail(examId: string, query: PaginateQueryDto) {
    const exam = await this.examRepository.findOne({
      where: {
        id: examId,
        parts: {
          skill: String(query.filter?.['skill']),
        },
      },
      relations: ['parts', 'parts.questions'],
    });

    return new DetailExamMapper(exam);
  }

  /**
   * Join a exam
   * @param examId
   * @returns
   */
  public async join(examId: string) {
    // Get exam by id
    const exam = await this.examRepository.findOne({
      where: {
        id: examId,
      },
      select: ['id', 'participantsCount']
    });

    // Error if exam not found
    if (isEmpty(exam)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Update total number of participations
    await Promise.all([
      this.examRepository.update({ id: examId }, { participantsCount: exam.participantsCount + 1 }),
      this.examEsService.updateByQuery(
        {
          bool: {
            must: [{ terms: { 'id.keyword': [examId] } }],
          },
        },
        {
          source: `ctx._source.participantsCount = ${exam.participantsCount + 1}`,
          lang: 'painless',
        }
      ),
    ]);

    // Result result
    return new UpdateResultDto(1);
  }
}
