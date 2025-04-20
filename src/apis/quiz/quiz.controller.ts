import { Policy } from '@modules/policy/policy.decorator';
import { Controller, Param, Req } from '@nestjs/common';

import { ApiGet, ApiPost } from '@common/decorators';
import { ApiOkInsertResultExample, ApiOkResponseExample } from '@common/decorators/example.decorator';
import { LessonIdDto } from '@common/dtos/id.dto';
import { ListQuizDto, QuizRecordDto } from '@common/dtos/quiz.dto';
import { Request } from '@common/models';

import { QuizService } from './quiz.service';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @ApiPost('lesson/:lessonId/generate')
  @Policy('create', 'quizzes')
  @ApiOkInsertResultExample(QuizRecordDto)
  create(@Param() params: LessonIdDto, @Req() req: Request) {
    return this.quizService.create(params.lessonId, req.user.id);
  }

  @ApiGet('lesson/:lessonId')
  @Policy('read', 'quizzes')
  @ApiOkResponseExample(ListQuizDto)
  getByLessonId(@Param() params: LessonIdDto) {
    return this.quizService.getByLessonId(params.lessonId);
  }
}
