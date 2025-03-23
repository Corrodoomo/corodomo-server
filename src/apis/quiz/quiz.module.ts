import { OpenAIModule } from '@modules/openai/openai.module';
import { LessonRepository } from '@app/apis/lesson/lesson.repository';
import { Module } from '@nestjs/common';

import { QuizController } from './quiz.controller';
import { QuizRepository } from './quiz.repository';
import { QuizService } from './quiz.service';

@Module({
  imports: [OpenAIModule],
  providers: [QuizService, QuizRepository, LessonRepository],
  controllers: [QuizController],
})
export class QuizModule {}
