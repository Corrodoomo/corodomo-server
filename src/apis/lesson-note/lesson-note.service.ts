import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';

import { InsertResultDto, UpdateResultDto } from '@common/dtos';
import { CreateLessonNoteDto, UpdateLessonNoteDto } from '@common/dtos/lesson-note.dto';
import { Messages } from '@common/enums';

import { LessonRepository } from '../lesson/lesson.repository';
import { LessonNoteRepository } from './lesson-note.repository';

@Injectable()
export class LessonNoteService {
  constructor(
    private readonly lessonNoteRepository: LessonNoteRepository,
    private readonly lessonRepository: LessonRepository
  ) {}

  /**
   * Create a note for a lesson
   * @param userId
   * @param body
   * @returns
   */
  public async create(userId: string, body: CreateLessonNoteDto) {
    // Detructure lessonId from body
    const { lessonId, ...lessonNote } = body;

    // Get lesson by id
    const lesson = await this.lessonRepository.getById(lessonId);

    // Error if lesson is empty
    if (isEmpty(lesson)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Save lesson note
    const savedLessonNote = await this.lessonNoteRepository.save({
      ...lessonNote,
      lesson: { id: lessonId },
      createdBy: {
        id: userId,
      },
    });

    // Return result
    return new InsertResultDto(savedLessonNote, 1);
  }

  /**
   * Update a lesson note
   * @param userId
   * @param body
   * @returns
   */
  public async update(userId: string, lessonNoteId: string, body: UpdateLessonNoteDto) {
    // Get lesson note by id
    const lessonNote = await this.lessonNoteRepository.getRawOne(lessonNoteId, ['id', 'created_by as "createdBy"']);

    // Error if lesson note is empty
    if (isEmpty(lessonNote)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Error if permission invalid
    if (lessonNote.createdBy !== userId) { 
      throw new ForbiddenException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Update lesson note by id
    await this.lessonNoteRepository.updateById(lessonNoteId, body);

    // Return result
    return new UpdateResultDto(1);
  }
}
