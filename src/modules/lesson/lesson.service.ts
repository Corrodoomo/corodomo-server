import { Injectable } from '@nestjs/common';
import { paginate, PaginateQuery } from 'nestjs-paginate';

import { CreateLessonDto, InsertResult, UpdateResult } from '@common/dtos';

import { LessonRepository } from './lesson.repository';

@Injectable()
export class LessonService {
  constructor(private readonly lessonRepository: LessonRepository) {}

  /**
   * Create lesson
   * @param lesson
   * @returns
   */
  public async create(lesson: CreateLessonDto): Promise<InsertResult> {
    // Create lesson
    await this.lessonRepository.save(lesson);

    // Return result
    return new InsertResult(1);
  }

  /**
   * Get lesson pagination
   * @param query
   * @returns
   */
  public async get(query: PaginateQuery) {
    return paginate(query, this.lessonRepository, { sortableColumns: ['category'] });
  }

  /**
   * Watch lesson
   * @param query
   * @returns
   */
  public async watch(lessonId: string): Promise<UpdateResult> {
    await this.lessonRepository.updateWatchedCount(lessonId);

    return new UpdateResult(1);
  }
}
