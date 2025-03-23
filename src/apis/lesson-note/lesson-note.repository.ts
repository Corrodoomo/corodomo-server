import { LessonNote } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@common/repository';

@Injectable()
export class LessonNoteRepository extends BaseRepository<LessonNote> {
  constructor(private dataSource: DataSource) {
    super(LessonNote, dataSource.createEntityManager());
  }
}
