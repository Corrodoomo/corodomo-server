import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

import { BaseRecordDto, BelongToUserDto } from './common.dto';

export class CreateFolderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;
}

export class FolderIdDto {
  @ApiProperty()
  @IsUUID()
  folderId: string;
}

export class MyFolderDto extends BaseRecordDto {
  @ApiProperty()
  name: string;
}

export class FolderRecordDto extends BelongToUserDto {
  @ApiProperty()
  name: string;
}
