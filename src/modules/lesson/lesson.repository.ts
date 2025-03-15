import { Lesson } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class LessonRepository extends Repository<Lesson> {
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
}
