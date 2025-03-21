import { LessonRepository } from '@modules/lesson/lesson.repository';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';

import { DeleteResultDto, InsertResultDto, UpdateResultDto } from '@common/dtos';
import { CreateNotedVocabularyDto, UpdateNotedVocabularyDto } from '@common/dtos/noted-vocabulary.dto';
import { Messages } from '@common/enums';

import { NotedVocabularyRepository } from './noted-vocabulary.repository';

@Injectable()
export class NotedVocabularyService {
  constructor(
    private readonly notedVocabularyRepository: NotedVocabularyRepository,
    private readonly lessonRepository: LessonRepository
  ) {}

  /**
   * Create noted vocabulary
   * @param lessonId
   * @param body
   * @returns
   */
  public async create(userId: string, body: CreateNotedVocabularyDto) {
    // Destructure the body
    const { lessonId, ...notedVocabulary } = body;

    // Get lesson by id
    const lesson = await this.lessonRepository.getById(lessonId);

    // Error if lesson not found
    if (isEmpty(lesson)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Save noted vocabulary
    const savedLesson = await this.notedVocabularyRepository.save({
      ...notedVocabulary,
      lesson: {
        id: lessonId,
      },
      createdBy: {
        id: userId,
      },
    });

    // Return result
    return new InsertResultDto(savedLesson, 1);
  }

  /**
   * Update noted vocabulary
   * @param lessonId
   * @param body
   * @returns
   */
  public async update(userId: string, notedVocabularyId: string, body: UpdateNotedVocabularyDto) {
    // Get lesson by id
    const notedVocabulary = await this.notedVocabularyRepository.getRawOne(notedVocabularyId, [
      'id',
      'created_by as "createdBy"',
    ]);

    // Error if lesson not found
    if (isEmpty(notedVocabulary)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Error if invalid permisison
    if (notedVocabulary.createdBy !== userId) {
      throw new BadRequestException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Save noted vocabulary
    await this.notedVocabularyRepository.updateById(notedVocabularyId, body);

    // Return result
    return new UpdateResultDto(1);
  }

  /**
   * Delete noted vocabulary by id
   * @param lessonId
   * @param body
   * @returns
   */
  public async delete(userId: string, notedVocabularyId: string) {
    // Get lesson by id
    const notedVocabulary = await this.notedVocabularyRepository.getRawOne(notedVocabularyId, [
      'id',
      'created_by as "createdBy"',
    ]);

    // Error if lesson not found
    if (isEmpty(notedVocabulary)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Error if invalid permisison
    if (notedVocabulary.createdBy !== userId) {
      throw new ForbiddenException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Save noted vocabulary
    await this.notedVocabularyRepository.delete(notedVocabularyId);

    // Return result
    return new DeleteResultDto(1);
  }
}
