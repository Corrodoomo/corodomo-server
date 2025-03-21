import { Lesson } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { LessonTagDto } from '@common/dtos';
import { BaseRepository } from '@common/repository';

@Injectable()
export class LessonRepository extends BaseRepository<Lesson> {
  constructor(private dataSource: DataSource) {
    super(Lesson, dataSource.createEntityManager());
  }

  /**
   * Update watched count
   * @param lessonId
   * @returns
   */
  public updateWatchedCount(lessonId: string) {
    return this.createQueryBuilder()
      .update()
      .set({ watchedCount: () => 'watchedCount + 1' }) // Sử dụng hàm SQL trực tiếp để tăng watchedCount
      .where('id = :id', { id: lessonId })
      .execute();
  }

  /**
   * Get distinc tags
   * @returns
   */
  public getDistinctTags() {
    return this.createQueryBuilder('lesson').select('tag').distinct(true).getRawMany<LessonTagDto>();
  }
}
