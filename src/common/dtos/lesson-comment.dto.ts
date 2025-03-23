import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { BelongToLessonAndUserDto } from './common.dto';

export class CreateLessonCommentDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsUUID()
  lessonId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  replyId?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  content: string;
}

export class UpdateLessonCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  content: string;
}

export class LessonCommentRecordDto extends BelongToLessonAndUserDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  replyId: string;
}
