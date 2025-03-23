import { ApiProperty } from '@nestjs/swagger';

import { BelongToLessonDto } from './common.dto';

export class SubtitleRecordDto extends BelongToLessonDto {
  @ApiProperty()
  text: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  offset: number;

  @ApiProperty()
  language: string;
}
