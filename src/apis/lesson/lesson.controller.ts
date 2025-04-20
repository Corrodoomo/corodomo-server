import { Lesson } from '@modules/database/entities';
import { Policy } from '@modules/policy/policy.decorator';
import { Body, Param, Query, Req } from '@nestjs/common';

import { ApiDelete, ApiGet, ApiPost, ApiPut, Controller } from '@common/decorators';
import {
  ApiOkDeleteResultExample,
  ApiOkInsertResultExample,
  ApiOkItemExample,
  ApiOkItemsExample,
  ApiOkPaginationExample,
  ApiOkUpdateResultExample,
} from '@common/decorators/example.decorator';
import { OpenAIMinimapItemDto } from '@common/dtos';
import { PaginateQueryDto } from '@common/dtos/common.dto';
import { LessonIdDto } from '@common/dtos/id.dto';
import {
  CreateLessonDto,
  LessonRecordDto,
  LessonVideoCourse,
  ListTagsDto,
  UpdateLessonDto,
} from '@common/dtos/lesson.dto';
import { Request } from '@common/models';

import { LessonService } from './lesson.service';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @ApiPost('/')
  @Policy('create', 'lessons')
  @ApiOkInsertResultExample(LessonRecordDto)
  create(@Body() body: CreateLessonDto, @Req() request: Request) {
    return this.lessonService.create(request.user.id, body);
  }

  @ApiDelete('/:lessonId')
  @Policy('delete', 'lessons')
  @ApiOkDeleteResultExample()
  delete(@Param() param: LessonIdDto, @Req() request: Request) {
    return this.lessonService.delete(request.user.id, param.lessonId);
  }

  @ApiGet('/')
  @Policy('read', 'lessons')
  @ApiOkPaginationExample(LessonRecordDto)
  get(@Query() query: PaginateQueryDto) {
    return this.lessonService.get(query);
  }

  @ApiGet('/search')
  @Policy('read', 'lessons')
  @ApiOkPaginationExample(LessonRecordDto)
  search(@Query() query: PaginateQueryDto) {
    return this.lessonService.search(query);
  }

  @ApiGet('/search/me')
  @Policy('read', 'lessons')
  @ApiOkPaginationExample(LessonRecordDto)
  searchMyHistory(@Query() query: PaginateQueryDto, @Req() req: Request) {
    return this.lessonService.searchMyHistory(query, req.user.id);
  }

  @ApiGet('/me')
  @Policy('read', 'lessons')
  @ApiOkPaginationExample(LessonRecordDto)
  getLessonsInFolder(@Query() query: PaginateQueryDto, @Req() req: Request) {
    return this.lessonService.getMyLessons(req.user.id, query);
  }

  @ApiGet('/list_tags')
  @Policy('read', 'lessons')
  @ApiOkItemsExample(ListTagsDto)
  getListOfTags() {
    return this.lessonService.getListTags();
  }

  @ApiGet('/:lessonId/video_course')
  @Policy('read', 'lessons')
  @ApiOkItemExample(LessonVideoCourse)
  getDetail(@Param() params: LessonIdDto, @Req() req: Request) {
    return this.lessonService.getDetail(params.lessonId, req.user.id);
  }

  @ApiGet('/:lessonId/minimap')
  @Policy('read', 'lessons')
  @ApiOkItemExample(OpenAIMinimapItemDto)
  getMinimaps(@Param() params: LessonIdDto) {
    return this.lessonService.getMinimaps(params.lessonId);
  }

  @ApiPut('/:lessonId/watched')
  @Policy('update', 'lessons')
  @ApiOkUpdateResultExample()
  watch(@Param() params: LessonIdDto, @Req() req: Request) {
    return this.lessonService.watch(req.user.id, params.lessonId);
  }

  @ApiPut('/:lessonId')
  @Policy('update', 'lessons')
  @ApiOkUpdateResultExample(Lesson)
  update(@Param() params: LessonIdDto, @Body() body: UpdateLessonDto, @Req() req: Request) {
    return this.lessonService.update(req.user.id, params.lessonId, body);
  }
}
