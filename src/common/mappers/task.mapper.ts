import { ApiProperty } from '@nestjs/swagger';
import { BelongToGroupAndUserMapper } from './common.mapper';

export class TaskRecordMapper extends BelongToGroupAndUserMapper {
  @ApiProperty()
  groupTaskId: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ type: [String] })
  tags: string[];

  @ApiProperty()
  assignees: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  description: string;
}
