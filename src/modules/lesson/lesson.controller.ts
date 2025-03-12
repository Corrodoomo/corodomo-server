import { Body, Controller, Param, Query } from '@nestjs/common';

import { Get, Post, Put } from '@common/decorators';
import { InsertResult, UpdateResult } from '@common/dtos';
import { PaginateQueryDto } from '@common/dtos/common.dto';
import { IdDto } from '@common/dtos/id.dto';
import { CreateLessonDto } from '@common/dtos/lesson.dto';

import { LessonService } from './lesson.service';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post('/', { model: InsertResult })
  create(@Body() body: CreateLessonDto) {
    return this.lessonService.create(body);
  }

  @Get('/', { auth: false })
  get(@Query() query: PaginateQueryDto) {
    return this.lessonService.get(query);
  }

  @Put('/:id/watched', { auth: false, model: UpdateResult })
  watch(@Param() params: IdDto): Promise<UpdateResult> {
    return this.lessonService.watch(params.id);
  }
}
