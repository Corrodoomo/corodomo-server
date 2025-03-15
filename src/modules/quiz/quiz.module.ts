import { ChatterModule } from '@modules/chatter/chatter.module';
import { LessonRepository } from '@modules/lesson/lesson.repository';
import { Module } from '@nestjs/common';

import { QuizController } from './quiz.controller';
import { QuizRepository } from './quiz.repository';
import { QuizService } from './quiz.service';

@Module({
  imports: [ChatterModule],
  providers: [QuizService, QuizRepository, LessonRepository],
  controllers: [QuizController],
})
export class QuizModule {}
