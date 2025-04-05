import { ApiProperty } from '@nestjs/swagger';

import { BelongToUserMapper } from './common.mapper';
import { ProjectRecordMapper } from './project.mapper';

export class WorkspaceRecordMapper extends BelongToUserMapper {
  @ApiProperty()
  title: string;

  @ApiProperty()
  members: string[];
}

export class MyWorkspaceMapper extends WorkspaceRecordMapper {
  @ApiProperty({ type: [ProjectRecordMapper] })
  projects: ProjectRecordMapper[];
}
