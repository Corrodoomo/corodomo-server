import { Quiz } from '@modules/database/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BelongToLessonDto } from './common.dto';

export class QuizDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  question: string;

  @ApiProperty()
  choices: string[];

  @ApiProperty()
  answer: string;

  @ApiProperty()
  createdAt: string;
}

export class QuizRecordDto extends BelongToLessonDto {
  @ApiProperty()
  question: string;

  @ApiProperty()
  choices: string[];

  @ApiProperty()
  answer: string;
}

export class ListQuizDto {
  @ApiProperty()
  @Type(() => QuizDto)
  quizzes: QuizDto[];

  constructor(quizzes: Quiz[]) {
    this.quizzes = quizzes.map(({ id, question, answer, choices, createdAt }) => ({
      id,
      question,
      answer,
      createdAt: createdAt.toISOString(),
      choices: choices.split('|'),
    }));
  }
}
