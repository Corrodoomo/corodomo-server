import { Body, Param, Query, Req } from '@nestjs/common';

import { Controller, Delete, Get, Post, Put, Roles } from '@common/decorators';
import { InsertResult, UpdateResultDto } from '@common/dtos';
import { PaginatedDto, PaginateQueryDto } from '@common/dtos/common.dto';
import { LessonIdDto } from '@common/dtos/id.dto';
import { CreateLessonDto, ListTagsDto } from '@common/dtos/lesson.dto';
import { SystemRoles } from '@common/enums';
import { Request } from '@common/models';

import { LessonService } from './lesson.service';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post('/', { model: InsertResult })
  @Roles([SystemRoles.LEARNER])
  create(@Body() body: CreateLessonDto, @Req() request: Request) {
    return this.lessonService.create(request.user.id, body);
  }

  @Delete('/:lessonId', { model: InsertResult })
  @Roles([SystemRoles.LEARNER])
  delete(@Param() param: LessonIdDto, @Req() request: Request) {
    return this.lessonService.delete(request.user.id, param.lessonId);
  }

  @Get('/', { model: PaginatedDto })
  @Roles([SystemRoles.LEARNER])
  get(@Query() query: PaginateQueryDto) {
    return this.lessonService.get(query);
  }

  @Get('/list_tags', { model: ListTagsDto })
  @Roles([SystemRoles.LEARNER])
  getListOfTags() {
    return this.lessonService.getListTags();
  }

  @Get('/:lessonId/video_course', { model: PaginatedDto })
  @Roles([SystemRoles.LEARNER])
  getDetail(@Param() params: LessonIdDto, @Req() req: Request) {
    return this.lessonService.getDetail(params.lessonId, req.user.id);
  }

  @Get('/:lessonId/minimap', { model: PaginatedDto })
  @Roles([SystemRoles.LEARNER])
  getMinimaps(@Param() params: LessonIdDto) {
    return this.lessonService.getMinimaps(params.lessonId);
  }

  @Put('/:lessonId/watched', { model: UpdateResultDto })
  @Roles([SystemRoles.LEARNER])
  watch(@Param() params: LessonIdDto): Promise<UpdateResultDto> {
    return this.lessonService.watch(params.lessonId);
  }
}
