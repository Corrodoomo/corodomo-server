import { Controller, Param, Req } from '@nestjs/common';

import { Post, Roles } from '@common/decorators';
import { InsertResult } from '@common/dtos';
import { LessonIdDto } from '@common/dtos/id.dto';
import { SystemRoles } from '@common/enums';
import { Request } from '@common/models';

import { SubtitleService } from './subtitle.service';

@Controller('subtitles')
export class SubtitleController {
  constructor(private readonly subtitleService: SubtitleService) {}

  @Post('/lesson/:lessonId/generate', { model: InsertResult })
  @Roles([SystemRoles.LEARNER])
  create(@Param() params: LessonIdDto, @Req() req: Request) {
    return this.subtitleService.create(params.lessonId, req.user.id);
  }
}
