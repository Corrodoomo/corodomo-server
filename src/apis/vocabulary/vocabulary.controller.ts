import { Policy } from '@modules/policy/policy.decorator';
import { Controller, Param } from '@nestjs/common';

import { ApiGet, ApiPost } from '@common/decorators';
import { ApiOkInsertResultExample } from '@common/decorators/example.decorator';
import { LessonIdDto } from '@common/dtos/id.dto';
import { MindmapRecordMapper } from '@common/mappers/mindmap.mapper';

import { VocabularyService } from './vocabulary.service';

@Controller('vocabularies')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @ApiPost('/lesson/:lessonId/generate')
  @Policy('read', 'vocabularies')
  @ApiOkInsertResultExample(MindmapRecordMapper)
  generateForLesson(@Param() params: LessonIdDto) {
    return this.vocabularyService.generateForLesson(params.lessonId);
  }

  @ApiGet('/lesson/:lessonId/flashcards')
  @Policy('read', 'vocabularies')
  getFlashcards(@Param() params: LessonIdDto) {
    return this.vocabularyService.getFlashcards(params.lessonId);
  }
}
