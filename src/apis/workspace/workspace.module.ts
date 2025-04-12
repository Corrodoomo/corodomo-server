import { Module } from '@nestjs/common';

import { ProjectRepository } from '../project/project.repository';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceRepository } from './workspace.repository';
import { WorkspaceService } from './workspace.service';

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService, WorkspaceRepository, ProjectRepository],
})
export class WorkspaceModule {}
