import { Body, Controller, Param, Req } from '@nestjs/common';

import { ApiDelete, ApiPost, ApiPut, RolesOld } from '@common/decorators';
import {
  ApiOkDeleteResultExample,
  ApiOkInsertResultExample,
  ApiOkUpdateResultExample,
} from '@common/decorators/example.decorator';
import { NotedVocabularyIdDto } from '@common/dtos/id.dto';
import {
  CreateNotedVocabularyDto,
  NotedVocabularyRecordDto,
  UpdateNotedVocabularyDto,
} from '@common/dtos/noted-vocabulary.dto';
import { SystemRoles } from '@common/enums';
import { Request } from '@common/models';

import { NotedVocabularyService } from './noted-vocabulary.service';

@Controller('noted-vocabularies')
export class NotedVocabularyController {
  constructor(private readonly notedVocabularyService: NotedVocabularyService) {}

  @ApiPost('/translate')
  @RolesOld([SystemRoles.LEARNER])
  @ApiOkInsertResultExample(NotedVocabularyRecordDto)
  create(@Body() body: CreateNotedVocabularyDto, @Req() req: Request) {
    return this.notedVocabularyService.create(req.user.id, body);
  }

  @ApiPut('/:notedVocabularyId/translate')
  @RolesOld([SystemRoles.LEARNER])
  @ApiOkUpdateResultExample(NotedVocabularyRecordDto)
  update(@Param() param: NotedVocabularyIdDto, @Body() body: UpdateNotedVocabularyDto, @Req() req: Request) {
    return this.notedVocabularyService.update(req.user.id, param.notedVocabularyId, body);
  }

  @ApiDelete('/:notedVocabularyId')
  @RolesOld([SystemRoles.LEARNER])
  @ApiOkDeleteResultExample()
  delete(@Param() param: NotedVocabularyIdDto, @Req() req: Request) {
    return this.notedVocabularyService.delete(req.user.id, param.notedVocabularyId);
  }
}
