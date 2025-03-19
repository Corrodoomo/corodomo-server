import { LessonRepository } from '@modules/lesson/lesson.repository';
import { OpenAIService } from '@modules/openai/openai.service';
import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { isEmpty } from 'lodash';

import { ListQuizDto } from '@common/dtos/quiz.dto';
import { Messages } from '@common/enums';

import { QuizRepository } from './quiz.repository';

@Injectable()
export class QuizService {
  constructor(
    private readonly quizRepository: QuizRepository,
    private readonly lessonRepository: LessonRepository,
    private readonly openaiService: OpenAIService
  ) {}

  /**
   * Substring content
   * @param fullSubtitles
   * @returns
   */
  substring(fullSubtitles: string) {
    if (fullSubtitles.length <= 600) return fullSubtitles;

    const start = fullSubtitles.substring(0, 200);
    const middle = fullSubtitles.substring(fullSubtitles.length / 2, fullSubtitles.length / 2 + 200);
    const end = fullSubtitles.substring(fullSubtitles.length - 200, fullSubtitles.length);

    return `${start}. ${middle}. ${end}`;
  }

  /**
   * Create quiz by lesson id
   * @param lessonId
   * @returns
   */
  async create(lessonId: string, userId: string) {
    // Check lesson
    const lesson = await this.lessonRepository.getRawOne(lessonId, [
      'id',
      'tag',
      'full_subtitles as "fullSubtitles"',
      'created_by as "createdBy"',
    ]);

    // Check lesson
    if (isEmpty(lesson)) {
      throw new BadRequestException();
    }

    // Check permission
    if (lesson.createdBy !== userId) {
      throw new ForbiddenException();
    }

    // Get created quiz
    const createdQuiz = await this.quizRepository.findOne({ where: { lesson: { id: lessonId } } });

    // Error if quiz created
    if (!isEmpty(createdQuiz)) {
      throw new InternalServerErrorException(Messages.ITEM_EXISTED);
    }

    // Get content
    const result = await this.openaiService.quiz(this.substring(lesson.fullSubtitles));

    // Mapping quizzes
    const quizzes = result.map((quiz) => ({
      question: quiz.question,
      choices: Object.values(quiz.choices).join('|'),
      answer: quiz.correctAnswer,
      lesson: {
        id: lessonId,
      },
    }));

    // Save datababases
    await this.quizRepository.save(quizzes);

    // Return generated quizzes
    return quizzes;
  }

  /**
   * Get quiz by lesson id
   * @param query
   * @returns
   */
  public async getByLessonId(lessonId: string): Promise<ListQuizDto> {
    const quizzes = await this.quizRepository.find({
      where: { lesson: { id: lessonId } },
      select: ['id', 'question', 'answer', 'choices', 'createdAt', 'updatedAt'],
    });

    return new ListQuizDto(quizzes);
  }
}
