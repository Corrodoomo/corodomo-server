import { NotedVocabulary } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@common/repository';

@Injectable()
export class NotedVocabularyRepository extends BaseRepository<NotedVocabulary> {
  constructor(private dataSource: DataSource) {
    super(NotedVocabulary, dataSource.createEntityManager());
  }
}
