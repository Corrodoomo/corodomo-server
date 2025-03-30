import { Controller, Param, Req } from '@nestjs/common';

import { ApiPost, RolesOld } from '@common/decorators';
import { ApiOkInsertResultExample } from '@common/decorators/example.decorator';
import { LessonIdDto } from '@common/dtos/id.dto';
import { SubtitleRecordDto } from '@common/dtos/subtitle.dto';
import { SystemRoles } from '@common/enums';
import { Request } from '@common/models';

import { SubtitleService } from './subtitle.service';

@Controller('subtitles')
export class SubtitleController {
  constructor(private readonly subtitleService: SubtitleService) {}

  @ApiPost('/lesson/:lessonId/generate')
  @RolesOld([SystemRoles.LEARNER])
  @ApiOkInsertResultExample(SubtitleRecordDto)
  create(@Param() params: LessonIdDto, @Req() req: Request) {
    return this.subtitleService.create(params.lessonId, req.user.id);
  }
}
