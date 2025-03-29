import { ApiProperty } from '@nestjs/swagger';

export class BaseRecordMapper {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class IdMapper {
  @ApiProperty()
  id: string;
}

export class BelongToGroupAndUserMapper {
  @ApiProperty()
  groupTask: IdMapper;

  @ApiProperty()
  createdBy: IdMapper;
}

export class BelongToUserMapper extends BaseRecordMapper {
  @ApiProperty()
  createdBy: IdMapper;
}
