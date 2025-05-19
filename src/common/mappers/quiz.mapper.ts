import { Quiz } from '@modules/database/entities';
import { ApiProperty } from '@nestjs/swagger';

export class QuizRecordMapper {
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

export class QuizMapper {
  @ApiProperty()
  data: QuizRecordMapper[];

  @ApiProperty()
  language: string | null;
  constructor(quizzes: Quiz[], language?: string) {
    this.language = language || null;
    this.data = quizzes.map(({ id, question, answer, choices, createdAt }) => ({
      id,
      question,
      answer,
      choices: choices.split('|'),
      createdAt: createdAt.toISOString(),
    }));
  }
}
