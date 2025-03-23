import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { BelongToLessonAndUserDto } from './common.dto';

export class CreateLessonNoteDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsUUID()
  lessonId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  content: string;
}

export class UpdateLessonNoteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  content: string;
}

export class LessonNoteRecordDto extends BelongToLessonAndUserDto {
  @ApiProperty()
  content: string;
}

