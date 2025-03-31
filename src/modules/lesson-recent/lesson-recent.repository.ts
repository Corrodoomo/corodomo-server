import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@common/repository';
import { LessonRecent } from '@modules/database/entities/lesson-recent.entity';

@Injectable()
export class LessonRecentRepository extends BaseRepository<LessonRecent> {
  constructor(private dataSource: DataSource) {
    super(LessonRecent, dataSource.createEntityManager());
  }
}
