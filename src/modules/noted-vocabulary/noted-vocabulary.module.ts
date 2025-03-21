import { Module } from '@nestjs/common';

import { NotedVocabularyController } from './noted-vocabulary.controller';
import { NotedVocabularyRepository } from './noted-vocabulary.repository';
import { NotedVocabularyService } from './noted-vocabulary.service';
import { LessonRepository } from '@modules/lesson/lesson.repository';

@Module({
  providers: [NotedVocabularyService, NotedVocabularyRepository, LessonRepository],
  controllers: [NotedVocabularyController],
})
export class NotedVocabularyModule {}
