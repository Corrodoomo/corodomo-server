import { Body, Controller, Param, Req } from '@nestjs/common';

import { ApiDelete, ApiGet, ApiPost, ApiPut, Roles } from '@common/decorators';
import {
  ApiOkDeleteResultExample,
  ApiOkInsertResultExample,
  ApiOkItemsExample,
  ApiOkUpdateResultExample,
} from '@common/decorators/example.decorator';
import { ProjectIdDto } from '@common/dtos/id.dto';
import { CreateProjectDto, UpdateProjectDto } from '@common/dtos/project.dto';
import { SystemRoles } from '@common/enums';
import { ProjectRecentMapper, ProjectRecordMapper } from '@common/mappers/project.mapper';
import { Request } from '@common/models';

import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiGet('/recents')
  @Roles(SystemRoles.LEARNER)
  @ApiOkItemsExample(ProjectRecentMapper)
  getMyProjectRecents(@Req() request: Request) {
    return this.projectService.getMyProjectRecents(request.user.id);
  }

  @ApiPost('/')
  @Roles(SystemRoles.LEARNER)
  @ApiOkInsertResultExample(ProjectRecordMapper)
  create(@Body() body: CreateProjectDto, @Req() request: Request) {
    return this.projectService.create(request.user.id, body);
  }

  @ApiPut('/:projectId')
  @Roles(SystemRoles.LEARNER)
  @ApiOkUpdateResultExample(ProjectRecordMapper)
  update(@Param() param: ProjectIdDto, @Body() body: UpdateProjectDto, @Req() request: Request) {
    return this.projectService.update(request.user.id, param.projectId, body);
  }

  @ApiDelete('/:projectId')
  @Roles(SystemRoles.LEARNER)
  @ApiOkDeleteResultExample()
  delete(@Param() param: ProjectIdDto, @Req() request: Request) {
    return this.projectService.delete(request.user.id, param.projectId);
  }
}
