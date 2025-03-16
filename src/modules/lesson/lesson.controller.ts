import { Body, Controller, Param, Query, Req } from '@nestjs/common';

import { Get, Post, Put, Roles } from '@common/decorators';
import { InsertResult, UpdateResultDto } from '@common/dtos';
import { PaginatedDto, PaginateQueryDto } from '@common/dtos/common.dto';
import { LessonIdDto } from '@common/dtos/id.dto';
import { CreateLessonDto } from '@common/dtos/lesson.dto';
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

  @Get('/', { model: PaginatedDto })
  get(@Query() query: PaginateQueryDto) {
    return this.lessonService.get(query);
  }

  @Put('/:lessonId/watched', { model: UpdateResultDto })
  watch(@Param() params: LessonIdDto): Promise<UpdateResultDto> {
    return this.lessonService.watch(params.lessonId);
  }
}
