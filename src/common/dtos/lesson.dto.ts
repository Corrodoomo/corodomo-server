import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, IsUUID, MaxLength, MinLength } from 'class-validator';

import { LessonCommentRecordDto } from './lesson-comment.dto';
import { LessonNoteRecordDto } from './lesson-note.dto';
import { NotedVocabularyRecordDto } from './noted-vocabulary.dto';
import { SubtitleRecordDto } from './subtitle.dto';

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

export class LessonTagDto {
  @ApiProperty()
  tag: string;
}

export class ListTagsDto {
  @ApiProperty({ type: [String] })
  tags: string[];

  constructor(tags: LessonTagDto[]) {
    this.tags = tags.map(({ tag }) => tag);
  }
}

export class LessonRecordDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  youtubeUrl: string;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty()
  fullSubtitles: string;

  @ApiProperty()
  tag: string;

  @ApiProperty()
  minimapId: string;

  @ApiProperty()
  level: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  watchedCount: number;

  @ApiProperty()
  watchedAt: Date;

  @ApiProperty()
  language: string;
}

export class LessonVideoCourse extends LessonRecordDto {
  @ApiProperty()
  comments: LessonCommentRecordDto[];

  @ApiProperty()
  notes: LessonNoteRecordDto[];

  @ApiProperty()
  notedVocabularies: NotedVocabularyRecordDto[];

  @ApiProperty()
  subtitles: SubtitleRecordDto[];
}
