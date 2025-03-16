import { Vocabulary } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class VocabularyRepository extends Repository<Vocabulary> {
  constructor(private dataSource: DataSource) {
    super(Vocabulary, dataSource.createEntityManager());
  }
}
