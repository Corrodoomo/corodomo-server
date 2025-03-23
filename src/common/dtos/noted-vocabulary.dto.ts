import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { BelongToLessonAndUserDto } from './common.dto';

export class CreateNotedVocabularyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  lessonId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  translatedText: string;
}

export class UpdateNotedVocabularyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  translatedText: string;
}

export class NotedVocabularyRecordDto extends BelongToLessonAndUserDto {
  @ApiProperty()
  text: string;

  @ApiProperty()
  translatedText: string;
}