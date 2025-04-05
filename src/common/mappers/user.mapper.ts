import { ApiProperty } from '@nestjs/swagger';

import { BaseRecordDto } from '@common/dtos/common.dto';

export class SignedInUserMapper {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken?: string;
}

export class RefreshUserMapper {
  @ApiProperty()
  accessToken: string;
}

export class SignedOutUserMapper {
  @ApiProperty()
  message: string;
}

export class SignedUpUserMapper extends BaseRecordDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  emailVerified: string;
}

export class ProfiledUserMapper {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  role?: string;
}
export class LessonRecentMapper {
  @ApiProperty()
  lessonId: string;

  @ApiProperty()
  accessedAt: Date;
}
