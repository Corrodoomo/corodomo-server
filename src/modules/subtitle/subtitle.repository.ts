import { Subtitle } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SubtitleRepository extends Repository<Subtitle> {
  constructor(private dataSource: DataSource) {
    super(Subtitle, dataSource.createEntityManager());
  }
}
