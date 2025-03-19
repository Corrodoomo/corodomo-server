import { Controller, Param, Put } from '@nestjs/common';

import { LessonIdDto } from '@common/dtos/id.dto';

import { VocabularyService } from './vocabulary.service';

@Controller('vocabulary')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Put('/:lessonId/generate')
  generateForLesson(@Param() params: LessonIdDto) {
    return this.vocabularyService.generateForLesson(params.lessonId);
  }
}
