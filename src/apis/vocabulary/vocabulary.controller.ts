import { Controller, Param } from '@nestjs/common';

import { Get, Post, Roles } from '@common/decorators';
import { InsertResultDto } from '@common/dtos';
import { LessonIdDto } from '@common/dtos/id.dto';
import { SystemRoles } from '@common/enums';

import { VocabularyService } from './vocabulary.service';

@Controller('vocabularies')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Post('/lesson/:lessonId/generate', { model: InsertResultDto })
  @Roles([SystemRoles.LEARNER])
  generateForLesson(@Param() params: LessonIdDto) {
    return this.vocabularyService.generateForLesson(params.lessonId);
  }

  @Get('/lesson/:lessonId/flashcards', { model: InsertResultDto })
  @Roles([SystemRoles.LEARNER])
  getFlashcards(@Param() params: LessonIdDto) {
    return this.vocabularyService.getFlashcards(params.lessonId);
  }
}
