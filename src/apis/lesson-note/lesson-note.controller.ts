import { Body, Controller, Param, Req } from '@nestjs/common';

import { Post, Put, Roles } from '@common/decorators';
import { InsertResultDto, UpdateResultDto } from '@common/dtos';
import { LessonNoteIdDto } from '@common/dtos/id.dto';
import { CreateLessonNoteDto, UpdateLessonNoteDto } from '@common/dtos/lesson-note.dto';
import { SystemRoles } from '@common/enums';
import { Request } from '@common/models';

import { LessonNoteService } from './lesson-note.service';

@Controller('lesson-notes')
export class LessonNoteController {
  constructor(private readonly lessonNoteService: LessonNoteService) {}

  @Post('/', { model: InsertResultDto })
  @Roles([SystemRoles.LEARNER])
  create(@Body() body: CreateLessonNoteDto, @Req() req: Request) {
    return this.lessonNoteService.create(req.user.id, body);
  }

  @Put('/:lessonNoteId', { model: UpdateResultDto })
  @Roles([SystemRoles.LEARNER])
  update(@Param() param: LessonNoteIdDto, @Body() body: UpdateLessonNoteDto, @Req() req: Request) {
    return this.lessonNoteService.update(req.user.id, param.lessonNoteId, body);
  }
}
