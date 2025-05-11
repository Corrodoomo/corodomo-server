import { Mindmap } from '@modules/database/entities/mindmap.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@common/repository';

@Injectable()
export class MindmapRepository extends BaseRepository<Mindmap> {
  constructor(private readonly dataSource: DataSource) {
    super(Mindmap, dataSource.createEntityManager());
  }
}
