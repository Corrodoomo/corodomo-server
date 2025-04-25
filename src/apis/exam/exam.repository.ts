import { Exam } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@common/repository';

@Injectable()
export class ExamRepository extends BaseRepository<Exam> {
  constructor(private dataSource: DataSource) {
    super(Exam, dataSource.createEntityManager());
  }
}
