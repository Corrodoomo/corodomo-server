import { Project, User, Workspace } from '@modules/database/entities';
import { ApiProperty } from '@nestjs/swagger';

import { ItemsDto } from '@common/dtos/common.dto';

import { BelongToUserMapper, IdMapper } from './common.mapper';

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

export class ProjectRecentMapper extends ProjectRecordMapper {
  @ApiProperty()
  workspace: IdMapper;

  @ApiProperty()
  createdBy: {
    id: string;
    email: string;
  };
}

export class ProjectRecentsMapper extends ItemsDto<ProjectRecentMapper> {
  constructor(projects: Project[]) {
    super(ProjectRecentsMapper.handleMapper(projects));
  }

  /**
   * Handle project recent mapper
   * @param projects 
   * @returns 
   */
  public static handleMapper(projects: Project[]): ProjectRecentMapper[] {
    return projects.map(({ workspace, id, name, description, theme, startAt, endAt, createdAt, updatedAt }) => {
      const { id: workspaceId, createdBy: user } = workspace as Workspace;
      const createdBy = user as User;

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
          id: workspaceId,
        },
        createdBy: {
          id: createdBy.id,
          email: createdBy.email,
        },
      };
    });
  }
}
