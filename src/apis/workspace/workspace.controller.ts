import { Body, Controller, Param, Req } from '@nestjs/common';

import { ApiDelete, ApiGet, ApiPost, ApiPut, Roles } from '@common/decorators';
import {
  ApiOkDeleteResultExample,
  ApiOkInsertResultExample,
  ApiOkItemsExample,
  ApiOkUpdateResultExample,
} from '@common/decorators/example.decorator';
import { WorkspaceIdDto } from '@common/dtos/id.dto';
import { CreateWorkspaceDto } from '@common/dtos/workspace.dto';
import { SystemRoles } from '@common/enums';
import { MyWorkspaceMapper, WorkspaceRecordMapper } from '@common/mappers/workspace.mapper';
import { Request } from '@common/models';

import { WorkspaceService } from './workspace.service';

@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @ApiGet('/')
  @Roles([SystemRoles.LEARNER])
  @ApiOkItemsExample(MyWorkspaceMapper)
  getMyWorkspaces(@Req() request: Request) {
    return this.workspaceService.getMyWorkspaces(request.user.id);
  }

  @ApiPost('/')
  @Roles([SystemRoles.LEARNER])
  @ApiOkInsertResultExample(WorkspaceRecordMapper)
  create(@Body() body: CreateWorkspaceDto, @Req() request: Request) {
    return this.workspaceService.create(request.user.id, body);
  }

  @ApiPut('/:workspaceId')
  @Roles([SystemRoles.LEARNER])
  @ApiOkUpdateResultExample(WorkspaceRecordMapper)
  update(@Param() param: WorkspaceIdDto, @Body() body: CreateWorkspaceDto, @Req() request: Request) {
    return this.workspaceService.update(request.user.id, param.workspaceId, body);
  }

  @ApiDelete('/:workspaceId')
  @Roles([SystemRoles.LEARNER])
  @ApiOkDeleteResultExample()
  delete(@Param() param: WorkspaceIdDto, @Req() request: Request) {
    return this.workspaceService.delete(request.user.id, param.workspaceId);
  }
}
