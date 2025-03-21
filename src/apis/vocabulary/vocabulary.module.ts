import { LessonRepository } from '@app/apis/lesson/lesson.repository';
import { OpenAIService } from '@modules/openai/openai.service';
import { Module } from '@nestjs/common';

import { VocabularyController } from './vocabulary.controller';
import { VocabularyRepository } from './vocabulary.repository';
import { VocabularyService } from './vocabulary.service';

@Module({
  imports: [],
  controllers: [VocabularyController],
  providers: [VocabularyService, OpenAIService, LessonRepository, VocabularyRepository],
})
export class VocabularyModule {}
