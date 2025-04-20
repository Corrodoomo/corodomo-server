import { LessonRecent } from '@modules/database/entities/lesson-recent.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@common/repository';

@Injectable()
export class LessonRecentRepository extends BaseRepository<LessonRecent> {
  constructor(private dataSource: DataSource) {
    super(LessonRecent, dataSource.createEntityManager());
  }
}
