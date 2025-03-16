import { LessonRepository } from '@modules/lesson/lesson.repository';
import { OpenAIService } from '@modules/openai/openai.service';
import { Module } from '@nestjs/common';

import { VocabularyController } from './vocabulary.controller';
import { VocabularyService } from './vocabulary.service';
import { VocabularyRepository } from './vocabulary.repository';

@Module({
  controllers: [VocabularyController],
  providers: [VocabularyService, OpenAIService, LessonRepository, VocabularyRepository],
})
export class VocabularyModule {}
