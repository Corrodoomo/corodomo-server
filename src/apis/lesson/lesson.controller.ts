import { Body, Param, Query, Req } from '@nestjs/common';

import { ApiDelete, ApiGet, ApiPost, ApiPut, Controller, Roles } from '@common/decorators';
import {
  ApiOkDeleteResultExample,
  ApiOkInsertResultExample,
  ApiOkItemExample,
  ApiOkItemsExample,
  ApiOkPaginationExample,
  ApiOkUpdateResultExample,
} from '@common/decorators/example.decorator';
import { OpenAIMinimapItemDto, UpdateResultDto } from '@common/dtos';
import { PaginateQueryDto } from '@common/dtos/common.dto';
import { LessonIdDto } from '@common/dtos/id.dto';
import { CreateLessonDto, LessonRecordDto, LessonVideoCourse, ListTagsDto } from '@common/dtos/lesson.dto';
import { SystemRoles } from '@common/enums';
import { Request } from '@common/models';

import { LessonService } from './lesson.service';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @ApiPost('/')
  @Roles([SystemRoles.LEARNER])
  @ApiOkInsertResultExample(LessonRecordDto)
  create(@Body() body: CreateLessonDto, @Req() request: Request) {
    return this.lessonService.create(request.user.id, body);
  }

  @ApiDelete('/:lessonId')
  @Roles([SystemRoles.LEARNER])
  @ApiOkDeleteResultExample()
  delete(@Param() param: LessonIdDto, @Req() request: Request) {
    return this.lessonService.delete(request.user.id, param.lessonId);
  }

  @ApiGet('/')
  @Roles([SystemRoles.LEARNER])
  @ApiOkPaginationExample(LessonRecordDto)
  get(@Query() query: PaginateQueryDto) {
    return this.lessonService.get(query);
  }

  @ApiGet('/list_tags')
  @Roles([SystemRoles.LEARNER])
  @ApiOkItemsExample(ListTagsDto)
  getListOfTags() {
    return this.lessonService.getListTags();
  }

  @ApiGet('/:lessonId/video_course')
  @Roles([SystemRoles.LEARNER])
  @ApiOkItemExample(LessonVideoCourse)
  getDetail(@Param() params: LessonIdDto, @Req() req: Request) {
    return this.lessonService.getDetail(params.lessonId, req.user.id);
  }

  @ApiGet('/:lessonId/minimap')
  @Roles([SystemRoles.LEARNER])
  @ApiOkItemExample(OpenAIMinimapItemDto)
  getMinimaps(@Param() params: LessonIdDto) {
    return this.lessonService.getMinimaps(params.lessonId);
  }

  @ApiPut('/:lessonId/watched')
  @Roles([SystemRoles.LEARNER])
  @ApiOkUpdateResultExample()
  watch(@Param() params: LessonIdDto, @Req() req: Request): Promise<UpdateResultDto> {
    return this.lessonService.watch(req.user.id, params.lessonId);
  }
}
