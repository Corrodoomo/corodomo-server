import { Module } from '@nestjs/common';

import { LessonNoteController } from './lesson-note.controller';
import { LessonNoteRepository } from './lesson-note.repository';
import { LessonNoteService } from './lesson-note.service';
import { LessonRepository } from '../lesson/lesson.repository';

@Module({
  providers: [LessonNoteService, LessonNoteRepository, LessonRepository],
  controllers: [LessonNoteController],
})
export class LessonNoteModule {}
