import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  youtubeUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  language: string;

  @ApiProperty()
  @IsUUID()
  folderId: string;
}

export class UpdateNoteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  content: string;
}

export class LessonTagDto {
  @ApiProperty()
  tag: string;
}

@ApiExtraModels(ListTagsDto)
export class ListTagsDto {
  @ApiProperty({ type: [String] })
  tags: string[];

  constructor(tags: LessonTagDto[]) {
    this.tags = tags.map(({ tag }) => tag);
  }
}
