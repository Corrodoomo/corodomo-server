import { Module } from '@nestjs/common';

import { UsersRepository } from '../user/user.repository';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceRepository } from './workspace.repository';
import { WorkspaceService } from './workspace.service';

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService, WorkspaceRepository, UsersRepository],
})
export class WorkspaceModule {}
