import { LessonRepository } from '@modules/lesson/lesson.repository';
import { OpenAIService } from '@modules/openai/openai.service';
import { BadRequestException, Injectable } from '@nestjs/common';

import { InsertResultDto } from '@common/dtos';
import { Messages } from '@common/enums';

import { VocabularyRepository } from './vocabulary.repository';

@Injectable()
export class VocabularyService {
  constructor(
    private readonly vocabularyRepository: VocabularyRepository,
    private readonly lessonRepository: LessonRepository,
    private readonly openaiService: OpenAIService
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
    const vocabularies = await this.openaiService.vocabulary(lesson.fullSubtitles);

    // Save them to db
    await this.vocabularyRepository.save(vocabularies);

    // Return result
    return new InsertResultDto(vocabularies, vocabularies.length);
  }
}
