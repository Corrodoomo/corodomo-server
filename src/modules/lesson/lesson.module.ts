import { Module } from '@nestjs/common';

import { LessonController } from './lesson.controller';
import { LessonRepository } from './lesson.repository';
import { LessonService } from './lesson.service';

@Module({
  imports: [],
  exports: [LessonService],
  controllers: [LessonController],
  providers: [LessonService, LessonRepository],
})
export class LessonModule {}
