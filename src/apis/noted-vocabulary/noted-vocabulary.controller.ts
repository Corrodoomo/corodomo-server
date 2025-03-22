import { Body, Controller, Param, Req } from '@nestjs/common';

import { Delete, Post, Put, Roles } from '@common/decorators';
import { NotedVocabularyIdDto } from '@common/dtos/id.dto';
import { CreateNotedVocabularyDto, UpdateNotedVocabularyDto } from '@common/dtos/noted-vocabulary.dto';
import { SystemRoles } from '@common/enums';

import { NotedVocabularyService } from './noted-vocabulary.service';
import { Request } from '@common/models';

@Controller('noted-vocabularies')
export class NotedVocabularyController {
  constructor(private readonly notedVocabularyService: NotedVocabularyService) {}

  @Post('/translate')
  @Roles([SystemRoles.LEARNER])
  create(@Body() body: CreateNotedVocabularyDto, @Req() req: Request) {
    return this.notedVocabularyService.create(req.user.id, body);
  }

  @Put('/:notedVocabularyId/translate')
  @Roles([SystemRoles.LEARNER])
  update(@Param() param: NotedVocabularyIdDto, @Body() body: UpdateNotedVocabularyDto, @Req() req: Request) {
    return this.notedVocabularyService.update(req.user.id, param.notedVocabularyId, body);
  }

  @Delete('/:notedVocabularyId')
  @Roles([SystemRoles.LEARNER])
  delete(@Param() param: NotedVocabularyIdDto, @Req() req: Request) {
    return this.notedVocabularyService.delete(req.user.id, param.notedVocabularyId);
  }
}
