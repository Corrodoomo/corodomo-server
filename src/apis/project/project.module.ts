import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './project.repository';
import { WorkspaceRepository } from '../workspace/workspace.repository';
import { UsersRepository } from '../user/user.repository';

@Module({
  providers: [ProjectService, ProjectRepository, WorkspaceRepository, UsersRepository],
  controllers: [ProjectController]
})
export class ProjectModule {}
