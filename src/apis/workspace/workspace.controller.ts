import { Body, Controller, Param, Query, Req } from '@nestjs/common';

import { ApiDelete, ApiGet, ApiPost, ApiPut, Roles } from '@common/decorators';
import {
  ApiOkDeleteResultExample,
  ApiOkInsertResultExample,
  ApiOkItemsExample,
  ApiOkUpdateResultExample,
} from '@common/decorators/example.decorator';
import { PaginateQueryDto } from '@common/dtos/common.dto';
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
  @Roles(SystemRoles.LEARNER)
  @ApiOkItemsExample(MyWorkspaceMapper)
  getMyWorkspaces(@Query() query: PaginateQueryDto, @Req() request: Request) {
    return this.workspaceService.getMyWorkspaces(query, request.user.id);
  }

  @ApiPost('/')
  @Roles(SystemRoles.LEARNER)
  @ApiOkInsertResultExample(WorkspaceRecordMapper)
  create(@Body() body: CreateWorkspaceDto, @Req() request: Request) {
    return this.workspaceService.create(request.user.id, body);
  }

  @ApiPut('/:workspaceId')
  @Roles(SystemRoles.LEARNER)
  @ApiOkUpdateResultExample(WorkspaceRecordMapper)
  update(@Param() param: WorkspaceIdDto, @Body() body: CreateWorkspaceDto, @Req() request: Request) {
    return this.workspaceService.update(request.user.id, param.workspaceId, body);
  }

  @ApiDelete('/:workspaceId')
  @Roles(SystemRoles.LEARNER)
  @ApiOkDeleteResultExample()
  delete(@Param() param: WorkspaceIdDto, @Req() request: Request) {
    return this.workspaceService.delete(request.user.id, param.workspaceId);
  }
}
