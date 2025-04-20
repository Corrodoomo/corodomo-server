import { Policy } from '@modules/policy/policy.decorator';
import { Body, Controller, Param, Query, Req } from '@nestjs/common';

import { ApiDelete, ApiGet, ApiPost, ApiPut } from '@common/decorators';
import {
  ApiOkDeleteResultExample,
  ApiOkInsertResultExample,
  ApiOkItemsExample,
  ApiOkUpdateResultExample,
} from '@common/decorators/example.decorator';
import { PaginateQueryDto } from '@common/dtos/common.dto';
import { WorkspaceIdDto } from '@common/dtos/id.dto';
import { CreateWorkspaceDto } from '@common/dtos/workspace.dto';
import { MyWorkspaceMapper, WorkspaceRecordMapper } from '@common/mappers/workspace.mapper';
import { Request } from '@common/models';

import { WorkspaceService } from './workspace.service';

@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @ApiGet('/')
  @Policy('read', 'workspaces')
  @ApiOkItemsExample(MyWorkspaceMapper)
  getMyWorkspaces(@Query() query: PaginateQueryDto, @Req() request: Request) {
    return this.workspaceService.getMyWorkspaces(query, request.user.id);
  }

  @ApiPost('/')
  @Policy('create', 'workspaces')
  @ApiOkInsertResultExample(WorkspaceRecordMapper)
  create(@Body() body: CreateWorkspaceDto, @Req() request: Request) {
    return this.workspaceService.create(request.user.id, body);
  }

  @ApiPut('/:workspaceId')
  @Policy('update', 'workspaces')
  @ApiOkUpdateResultExample(WorkspaceRecordMapper)
  update(@Param() param: WorkspaceIdDto, @Body() body: CreateWorkspaceDto, @Req() request: Request) {
    return this.workspaceService.update(request.user.id, param.workspaceId, body);
  }

  @ApiDelete('/:workspaceId')
  @Policy('delete', 'workspaces')
  @ApiOkDeleteResultExample()
  delete(@Param() param: WorkspaceIdDto, @Req() request: Request) {
    return this.workspaceService.delete(request.user.id, param.workspaceId);
  }
}
