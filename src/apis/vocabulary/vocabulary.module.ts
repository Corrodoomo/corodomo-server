import { LessonRepository } from '@app/apis/lesson/lesson.repository';
import { OpenAIService } from '@modules/openai/openai.service';
import { Module } from '@nestjs/common';

import { MindmapRepository } from '../mindmap/mindmap.repository';
import { MindmapService } from '../mindmap/mindmap.service';
import { VocabularyController } from './vocabulary.controller';
import { VocabularyRepository } from './vocabulary.repository';
import { VocabularyService } from './vocabulary.service';

@Module({
  imports: [],
  controllers: [VocabularyController],
  providers: [
    VocabularyService,
    OpenAIService,
    LessonRepository,
    VocabularyRepository,
    MindmapService,
    MindmapRepository,
  ],
})
export class VocabularyModule {}
