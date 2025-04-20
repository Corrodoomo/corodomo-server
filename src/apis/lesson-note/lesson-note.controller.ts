import { Policy } from '@modules/policy/policy.decorator';
import { Body, Controller, Param, Req } from '@nestjs/common';

import { ApiPost, ApiPut } from '@common/decorators';
import { ApiOkInsertResultExample, ApiOkUpdateResultExample } from '@common/decorators/example.decorator';
import { LessonNoteIdDto } from '@common/dtos/id.dto';
import { CreateLessonNoteDto, LessonNoteRecordDto, UpdateLessonNoteDto } from '@common/dtos/lesson-note.dto';
import { Request } from '@common/models';

import { LessonNoteService } from './lesson-note.service';

@Controller('lesson-notes')
export class LessonNoteController {
  constructor(private readonly lessonNoteService: LessonNoteService) {}

  @ApiPost('/')
  @Policy('create', 'lesson_notes')
  @ApiOkInsertResultExample(LessonNoteRecordDto)
  create(@Body() body: CreateLessonNoteDto, @Req() req: Request) {
    return this.lessonNoteService.create(req.user.id, body);
  }

  @ApiPut('/:lessonNoteId')
  @Policy('update', 'lesson_notes')
  @ApiOkUpdateResultExample(LessonNoteRecordDto)
  update(@Param() param: LessonNoteIdDto, @Body() body: UpdateLessonNoteDto, @Req() req: Request) {
    return this.lessonNoteService.update(req.user.id, param.lessonNoteId, body);
  }
}
