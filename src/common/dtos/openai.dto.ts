import { ApiProperty } from '@nestjs/swagger';

export class OpenAIChoiceDto {
  @ApiProperty()
  A: string;

  @ApiProperty()
  B: string;

  @ApiProperty()
  C: string;

  @ApiProperty()
  D: string;
}

export class OpenAIQuizDto {
  @ApiProperty()
  question: string;

  @ApiProperty()
  choices: OpenAIChoiceDto;

  @ApiProperty()
  correctAnswer: string;
}

export class OpenAITopicDto {
  @ApiProperty()
  topic: string;
}

export class OpenAILevelDto {
  @ApiProperty()
  level: string;
}

export class OpenAIVocabularyDto {
  @ApiProperty()
  word: string;

  @ApiProperty()
  type: string;
}
