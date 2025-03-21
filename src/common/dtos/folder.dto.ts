import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

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
