import { Controller, Param } from '@nestjs/common';

import { Post, Roles } from '@common/decorators';
import { LessonIdDto } from '@common/dtos/id.dto';
import { SystemRoles } from '@common/enums';

import { VocabularyService } from './vocabulary.service';
import { InsertResultDto } from '@common/dtos';

@Controller('vocabulary')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Post('/:lessonId/generate', { model: InsertResultDto })
  @Roles([SystemRoles.LEARNER])
  generateForLesson(@Param() params: LessonIdDto) {
    return this.vocabularyService.generateForLesson(params.lessonId);
  }
}
