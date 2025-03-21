import { MinimapEsService } from '@modules/elastic-search/services/minimap-es.service';
import { LessonRepository } from '@modules/lesson/lesson.repository';
import { OpenAIService } from '@modules/openai/openai.service';
import { BadRequestException, Injectable } from '@nestjs/common';

import { InsertResultDto } from '@common/dtos';
import { ItemsDto } from '@common/dtos/common.dto';
import { Messages } from '@common/enums';

import { VocabularyRepository } from './vocabulary.repository';

@Injectable()
export class VocabularyService {
  constructor(
    private readonly vocabularyRepository: VocabularyRepository,
    private readonly lessonRepository: LessonRepository,
    private readonly openaiService: OpenAIService,
    private readonly minimapEsService: MinimapEsService
  ) {}

  /**
   * Generate vocabulary for a lesson
   * @param lessonId
   * @returns
   */
  public async generateForLesson(lessonId: string) {
    // Get lesson from id
    const lesson = await this.lessonRepository.findOne({ where: { id: lessonId }, select: ['id', 'fullSubtitles'] });

    // Check if lesson not existed
    if (!lesson) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Generate vocabularies
    const [vocabularies, minimap] = await Promise.all([
      this.openaiService.vocabulary(lesson.fullSubtitles),
      this.openaiService.minimap(lesson.fullSubtitles),
    ]);

    // Save document to elastic search
    const document = await this.minimapEsService.indexDocument(minimap);

    // Save them to db
    await Promise.all([
      this.vocabularyRepository.save(vocabularies.map((vocabulary) => ({ ...vocabulary, lesson: { id: lessonId } }))),
      this.lessonRepository.update({ id: lessonId }, { minimapId: document._id }),
    ]);

    // Return result
    return new InsertResultDto(minimap, minimap.length);
  }

  /**
   * Get flashcards for a lesson
   * @param lessonId
   */
  public async getFlashcards(lessonId: string) {
    const flashcards = await this.vocabularyRepository.find({ where: { lesson: { id: lessonId } } });

    return new ItemsDto(flashcards);
  }
}
