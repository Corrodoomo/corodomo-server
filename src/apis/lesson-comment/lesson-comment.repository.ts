import { BaseRepository } from '@common/repository';
import { LessonComment } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class LessonCommentRepository extends BaseRepository<LessonComment> {
  constructor(private dataSource: DataSource) {
    super(LessonComment, dataSource.createEntityManager());
  }
}
