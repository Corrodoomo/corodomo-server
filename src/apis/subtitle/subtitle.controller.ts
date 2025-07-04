import { Policy } from '@modules/policy/policy.decorator';
import { Controller, Param, Req } from '@nestjs/common';

import { ApiPost } from '@common/decorators';
import { ApiOkInsertResultExample } from '@common/decorators/example.decorator';
import { LessonIdDto } from '@common/dtos/id.dto';
import { SubtitleRecordDto } from '@common/dtos/subtitle.dto';
import { Request } from '@common/models';

import { SubtitleService } from './subtitle.service';

@Controller('subtitles')
export class SubtitleController {
  constructor(private readonly subtitleService: SubtitleService) {}

  @ApiPost('/lesson/:lessonId/generate')
  @Policy('create', 'subtitles')
  @ApiOkInsertResultExample(SubtitleRecordDto)
  create(@Param() params: LessonIdDto, @Req() req: Request) {
    return this.subtitleService.create(params.lessonId, req.user.id);
  }
}
