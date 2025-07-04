import { LessonRepository } from '@app/apis/lesson/lesson.repository';
import { MinimapEsService } from '@modules/elastic-search/services/minimap-es.service';
import { OpenAIService } from '@modules/openai/openai.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';

import { InsertResultDto } from '@common/dtos';
import { Messages } from '@common/enums';
import { MindmapRecordMapper } from '@common/mappers/mindmap.mapper';
import { FlashcardListMapper } from '@common/mappers/vocabulary.mapper';

import { MindmapRepository } from '../mindmap/mindmap.repository';
import { VocabularyRepository } from './vocabulary.repository';

@Injectable()
export class VocabularyService {
  constructor(
    private readonly vocabularyRepository: VocabularyRepository,
    private readonly lessonRepository: LessonRepository,
    private readonly openaiService: OpenAIService,
    private readonly minimapEsService: MinimapEsService,
    private readonly mindmapRepository: MindmapRepository
  ) {}

  /**
   * Generate vocabulary for a lesson
   * @param lessonId
   * @returns
   */
  public async generateForLesson(lessonId: string) {
    // Get lesson from id
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
      select: ['id', 'fullSubtitles', 'language'],
    });

    // Check if lesson not existed
    if (!lesson) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    let vocabularies;
    let minimap: MindmapRecordMapper[] = [];

    const mindmapExist = this.mindmapRepository.getById(lessonId);

    if (!isEmpty(mindmapExist)) {
      throw new BadRequestException(Messages.ITEM_EXISTED);
    }

    minimap = await this.openaiService.minimap(lesson.fullSubtitles, lesson.language);

    minimap.forEach((item) => {
      item.lesson = { id: lessonId };
    });
    // insert to mindmap table
    this.mindmapRepository.insert(minimap);

    // Get vocabulary from id
    const vocabulary = await this.vocabularyRepository.findOne({
      where: { lesson: { id: lessonId } },
      select: ['id'],
    });

    // Skip this step if vocabulary is created
    if (isEmpty(vocabulary)) {
      // Generate vocabularies
      vocabularies = await this.openaiService.vocabulary(lesson.fullSubtitles, lesson.language);

      // Save vocabulary to database
      await this.vocabularyRepository.save(
        vocabularies.map((vocabulary) => ({ ...vocabulary, lesson: { id: lessonId } }))
      );
    }

    // Return result
    return new InsertResultDto({ minimap, vocabularies }, Number(vocabularies?.length) + Number(minimap?.length));
  }

  /**
   * Get flashcards for a lesson
   * @param lessonId
   */
  public async getFlashcards(lessonId: string) {
    // Get lesson by id
    const lesson = await this.lessonRepository.getById(lessonId, ['id', 'language']);

    // Error if lesson not found
    if (isEmpty(lesson)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Get flashcard by lesson id
    const flashcards = await this.vocabularyRepository.find({ where: { lesson: { id: lessonId } } });

    // Return result
    return new FlashcardListMapper(flashcards, lesson.language);
  }
}
