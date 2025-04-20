import { ProjectRecent } from '@modules/database/entities/project-recent.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@common/repository';

@Injectable()
export class ProjectRecentRepository extends BaseRepository<ProjectRecent> {
  constructor(private dataSource: DataSource) {
    super(ProjectRecent, dataSource.createEntityManager());
  }
}
