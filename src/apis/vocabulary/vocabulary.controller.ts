import { Controller, Param } from '@nestjs/common';

import { ApiGet, ApiPost, Roles } from '@common/decorators';
import { ApiOkInsertResultExample } from '@common/decorators/example.decorator';
import { LessonIdDto } from '@common/dtos/id.dto';
import { OpenAIVocabularyMinimapDto } from '@common/dtos/vocabulary.dto';
import { SystemRoles } from '@common/enums';

import { VocabularyService } from './vocabulary.service';

@Controller('vocabularies')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @ApiPost('/lesson/:lessonId/generate')
  @Roles(SystemRoles.LEARNER)
  @ApiOkInsertResultExample(OpenAIVocabularyMinimapDto)
  generateForLesson(@Param() params: LessonIdDto) {
    return this.vocabularyService.generateForLesson(params.lessonId);
  }

  @ApiGet('/lesson/:lessonId/flashcards')
  @Roles(SystemRoles.LEARNER)
  getFlashcards(@Param() params: LessonIdDto) {
    return this.vocabularyService.getFlashcards(params.lessonId);
  }
}
