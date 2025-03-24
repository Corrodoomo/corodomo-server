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
