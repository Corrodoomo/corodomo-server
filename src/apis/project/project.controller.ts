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
import { ProjectIdDto } from '@common/dtos/id.dto';
import { CreateProjectDto, UpdateProjectDto } from '@common/dtos/project.dto';
import { ProjectRecentMapper, ProjectRecordMapper } from '@common/mappers/project.mapper';
import { Request } from '@common/models';

import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiGet('/recents')
  @Policy('read', 'projects')
  @ApiOkItemsExample(ProjectRecentMapper)
  getMyProjectRecents(@Req() request: Request) {
    return this.projectService.getMyProjectRecents(request.user.id);
  }

  @ApiGet('/')
  @Policy('read', 'projects')
  @ApiOkItemsExample(ProjectRecentMapper)
  get(@Query() query: PaginateQueryDto, @Req() req: Request) {
    return this.projectService.getPagination(query, req.user.id);
  }

  @ApiPost('/')
  @Policy('create', 'projects')
  @ApiOkInsertResultExample(ProjectRecordMapper)
  create(@Body() body: CreateProjectDto, @Req() request: Request) {
    return this.projectService.create(request.user.id, body);
  }

  @ApiPut('/:projectId')
  @Policy('update', 'projects')
  @ApiOkUpdateResultExample(ProjectRecordMapper)
  update(@Param() param: ProjectIdDto, @Body() body: UpdateProjectDto, @Req() request: Request) {
    return this.projectService.update(request.user.id, param.projectId, body);
  }

  @ApiDelete('/:projectId')
  @Policy('delete', 'projects')
  @ApiOkDeleteResultExample()
  delete(@Param() param: ProjectIdDto, @Req() request: Request) {
    return this.projectService.delete(request.user.id, param.projectId);
  }
}
