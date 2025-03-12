import { LessonRepository } from '@modules/lesson/lesson.repository';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
// import { isEmpty } from 'lodash';

import { QuizRepository } from './quiz.repository';
import { ChatterService } from '@modules/chatter/chatter.service';
import { isEmpty } from 'lodash';

@Injectable()
export class QuizService {
  constructor(
    private readonly quizRepository: QuizRepository,
    private readonly lessonRepository: LessonRepository,
    private readonly chatterService: ChatterService,
  ) {}

  /**
   * Create quiz by lesson id
   * @param lessonId
   * @returns
   */
  async create(lessonId: string, userId: string) {
    // Check lesson
    const lesson = await this.lessonRepository.findOne({ where: { id: lessonId } });

    // Check lesson
    if (isEmpty(lesson)) {
      throw new BadRequestException();
    }

    // Check permission
    if (lesson.createdBy.id !== userId) {
      throw new ForbiddenException();
    }

    return this.chatterService.chat('Hello');
  }
}
