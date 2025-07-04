import { Workspace } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@common/repository';

@Injectable()
export class WorkspaceRepository extends BaseRepository<Workspace> {
  constructor(private dataSource: DataSource) {
    super(Workspace, dataSource.createEntityManager());
  }

  /**
   * Query my workspaces
   * @param userId
   * @returns
   */
  public queryMyWorkspaces(userId: string) {
    return this.createQueryBuilder('workspace')
      .leftJoin('workspace.projects', 'project')
      .where('workspace.createdBy = :userId')
      .orWhere(':userId::text = ANY(string_to_array(project.members, :comma))')
      .select([
        'DISTINCT ON (workspace.id) workspace.id AS "id"',
        'workspace.title AS "title"',
        'workspace.theme AS "theme"',
        'workspace.updated_at AS "updatedAt"',
        'workspace.created_at AS "createdAt"',
      ])
      .cache(true)
      .setParameters({ userId, comma: ',' });
  }

  /**
   * Query workspace by id
   * @param userId
   * @returns
   */
  public queryWorkspaceExisted(workspaceId: string) {
    return this.getRawOne(workspaceId, ['id', 'created_by as "createdBy"']);
  }
}
