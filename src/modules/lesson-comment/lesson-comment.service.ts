import { LessonRepository } from '@modules/lesson/lesson.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';

import { DeleteResultDto, InsertResultDto, UpdateResultDto } from '@common/dtos';
import { CreateLessonCommentDto, UpdateLessonCommentDto } from '@common/dtos/lesson-comment.dto';
import { Messages } from '@common/enums';

import { LessonCommentRepository } from './lesson-comment.repository';

@Injectable()
export class LessonCommentService {
  constructor(
    private readonly lessonCommentRepository: LessonCommentRepository,
    private readonly lessonRepository: LessonRepository
  ) {}

  /**
   * Create noted vocabulary
   * @param lessonId
   * @param body
   * @returns
   */
  public async create(userId: string, body: CreateLessonCommentDto) {
    // Destructure the body
    const { lessonId, ...comment } = body;
    
    // Get lesson by id
    const lesson = await this.lessonRepository.getById(lessonId);

    // Error if lesson not found
    if (isEmpty(lesson)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Save noted vocabulary
    const savedComment = await this.lessonCommentRepository.save({
      ...comment,
      lesson: {
        id: lessonId,
      },
      createdBy: {
        id: userId,
      },
    });

    // Return result
    return new InsertResultDto(savedComment, 1);
  }

  /**
   * Update by comment id
   * @param userId
   * @param commentId
   * @param body
   * @returns
   */
  public async update(userId: string, commentId: string, body: UpdateLessonCommentDto) {
    // Get comment by id
    const comment = await this.lessonCommentRepository.getRawOne(commentId, ['id', 'created_by as "createdBy"']);

    // Error if comment not found
    if (isEmpty(comment)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Error if permission invalid
    if (comment.createdBy !== userId) {
      throw new BadRequestException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Update comment
    await this.lessonCommentRepository.updateById(commentId, body);

    // Return result
    return new UpdateResultDto(1);
  }

  /**
   * Delete by comment id
   * @param userId
   * @param commentId
   * @param body
   * @returns
   */
  public async delete(userId: string, commentId: string) {
    // Get comment by id
    const comment = await this.lessonCommentRepository.getRawOne(commentId, ['id', 'created_by as "createdBy"']);

    // Error if comment not found
    if (isEmpty(comment)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Error if permission invalid
    if (comment.createdBy !== userId) {
      throw new BadRequestException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Delete comment
    await this.lessonCommentRepository.delete(commentId);

    // Return result
    return new DeleteResultDto(1);
  }
}
