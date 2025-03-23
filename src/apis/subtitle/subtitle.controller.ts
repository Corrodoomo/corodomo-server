import { Controller, Param, Req } from '@nestjs/common';

import { ApiPost, Roles } from '@common/decorators';
import { LessonIdDto } from '@common/dtos/id.dto';
import { SystemRoles } from '@common/enums';
import { Request } from '@common/models';

import { SubtitleService } from './subtitle.service';
import { ApiOkInsertResultExample } from '@common/decorators/example.decorator';
import { SubtitleRecordDto } from '@common/dtos/subtitle.dto';

@Controller('subtitles')
export class SubtitleController {
  constructor(private readonly subtitleService: SubtitleService) {}

  @ApiPost('/lesson/:lessonId/generate')
  @Roles([SystemRoles.LEARNER])
  @ApiOkInsertResultExample(SubtitleRecordDto)
  create(@Param() params: LessonIdDto, @Req() req: Request) {
    return this.subtitleService.create(params.lessonId, req.user.id);
  }
}
