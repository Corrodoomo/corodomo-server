import { User } from '@modules/database/entities';
import { ApiProperty } from '@nestjs/swagger';

import { BaseRecordDto } from '@common/dtos/common.dto';

export class UserDto extends BaseRecordDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  emailVerified: boolean;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  constructor(user: User) {
    super();
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.emailVerified = user.emailVerified;
    this.createdAt = user.createdAt?.toISOString();
    this.updatedAt = user.updatedAt?.toISOString();
  }
}
