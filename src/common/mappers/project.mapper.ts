import { Project, User, Workspace } from '@modules/database/entities';
import { ApiProperty } from '@nestjs/swagger';

import { BelongToUserMapper, ItemsMapper } from './common.mapper';

export class ProjectRecordMapper extends BelongToUserMapper {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  theme: string;

  @ApiProperty()
  startAt: Date;

  @ApiProperty()
  endAt: Date;
}

export class ProjectRecentMapper {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  theme: string;

  @ApiProperty()
  startAt: Date;

  @ApiProperty()
  endAt: Date;

  @ApiProperty()
  workspace: {
    id: string;
    createdBy: {
      id: string;
      email: string;
    };
  };

  @ApiProperty()
  accessedAt?: Date;
}

export class ProjectRecentsMapper extends ItemsMapper<ProjectRecentMapper> {
  constructor(projects: Project[]) {
    super(ProjectRecentsMapper.handleMapper(projects));
  }

  /**
   * Handle project recent mapper
   * @param projects
   * @returns
   */
  public static handleMapper(projects: Project[]): ProjectRecentMapper[] {
    return projects.map(
      ({ workspace, id, name, description, theme, startAt, endAt, createdAt, updatedAt, recents }) => {
        const ws = workspace as Workspace;
        const createdBy = ws.createdBy as User;

        return {
          id,
          name,
          description,
          theme,
          startAt,
          endAt,
          createdAt,
          updatedAt,
          workspace: {
            id: ws.id,
            createdBy: {
              id: createdBy.id,
              email: createdBy.email,
            }
          },
          accessedAt: recents.pop()?.accessedAt,
        };
      }
    );
  }
}
