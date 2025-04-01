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

  /**
   * Query lesson for user
   * @param lessonId 
   * @param userId 
   * @returns 
   */
  public async getLessonForUser(lessonId: string, userId: string) {
    return this.createQueryBuilder('lesson')
    .select(['lesson.id', 'lesson.tag', 'lesson.duration', 'lesson.language', 'lesson.level', 'lesson.watchedCount'])
    .leftJoinAndSelect('lesson.notes', 'notes', 'notes.createdBy = :userId', { userId })
    .leftJoinAndSelect('lesson.comments', 'comments')
    .leftJoinAndSelect('lesson.notedVocabularies', 'notedVocabularies')
    .leftJoinAndSelect('lesson.subtitles', 'subtitles')
    .where('lesson.id = :lessonId', { lessonId: lessonId })
    .getOne();  
  }
}
