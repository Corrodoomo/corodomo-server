import { LessonRepository } from '@modules/lesson/lesson.repository';
import { Module } from '@nestjs/common';

import { LessonCommentController } from './lesson-comment.controller';
import { LessonCommentRepository } from './lesson-comment.repository';
import { LessonCommentService } from './lesson-comment.service';

@Module({
  providers: [LessonCommentService, LessonCommentRepository, LessonRepository],
  controllers: [LessonCommentController],
})
export class LessonCommentModule {}
