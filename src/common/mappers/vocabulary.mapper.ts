import { Vocabulary } from '@modules/database/entities';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Flashcard Record Mapper
 */
export class FlashcardRecordMapper {
  @ApiProperty()
  id: string;

  @ApiProperty()
  word: string;

  @ApiProperty()
  type: string;
}

/**
 * Flashcard List Mapper
 */
export class FlashcardListMapper {
  @ApiProperty()
  data: FlashcardRecordMapper[];

  @ApiProperty()
  language: string | null;

  constructor(flashcards: Vocabulary[], language?: string) {
    this.language = language || null;
    this.data = flashcards.map(({ id, word, type }) => ({ id, word, type }));
  }
}
