import { Project } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@common/repository';

@Injectable()
export class ProjectRepository extends BaseRepository<Project> {
  constructor(private dataSource: DataSource) {
    super(Project, dataSource.createEntityManager());
  }

  /**
   * Query my project recents
   * @param projectIds
   * @returns
   */
  public queryMyProjectRecents(projectIds: string[]) {
    return this.createQueryBuilder('project')
      .innerJoin('project.workspace', 'workspace')
      .innerJoin('workspace.createdBy', 'user')
      .select([
        'project.id',
        'project.name',
        'project.theme',
        'project.description',
        'project.startAt',
        'project.endAt',
        'workspace.id',
        'user.id',
        'user.email',
      ])
      .where('project.id in (:...projectIds)', { projectIds })
      .getMany();
  }
}
