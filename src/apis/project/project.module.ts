import { ProjectRecentRepository } from '@modules/project-recent/project-recent.repository';
import { Module } from '@nestjs/common';

import { UserRepository } from '../user/user.repository';
import { WorkspaceRepository } from '../workspace/workspace.repository';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './project.repository';
import { ProjectService } from './project.service';

@Module({
  providers: [ProjectService, ProjectRepository, WorkspaceRepository, UserRepository, ProjectRecentRepository],
  controllers: [ProjectController],
})
export class ProjectModule {}
