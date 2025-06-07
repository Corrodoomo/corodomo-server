import { User } from '@modules/database/entities';
import { ApiProperty } from '@nestjs/swagger';

import { BaseRecordDto } from '@common/dtos/common.dto';
import { ItemMapper } from '@common/mappers/common.mapper';

export class SignedInUserMapper {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken?: string;

  @ApiProperty()
  idToken: string;
}

export class AuthUserMapper {
  @ApiProperty()
  message: string;
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

export class UserNewMapper extends BaseRecordDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  emailVerified: boolean;

  @ApiProperty()
  role: string;
}

export class UserProfileMapper {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  emailVerified: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class ProfileMapper extends ItemMapper<UserProfileMapper> {
  constructor(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    super({ ...rest, image: rest.avatarUrl });
  }
}
