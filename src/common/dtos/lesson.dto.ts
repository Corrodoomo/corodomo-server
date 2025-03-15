import { ApiProperty } from '@nestjs/swagger';
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
