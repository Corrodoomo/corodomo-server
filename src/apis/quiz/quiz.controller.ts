import { Controller, Param, Req } from '@nestjs/common';

import { ApiGet, ApiPost, Roles } from '@common/decorators';
import { ApiOkInsertResultExample, ApiOkResponseExample } from '@common/decorators/example.decorator';
import { LessonIdDto } from '@common/dtos/id.dto';
import { ListQuizDto, QuizRecordDto } from '@common/dtos/quiz.dto';
import { SystemRoles } from '@common/enums';
import { Request } from '@common/models';

import { QuizService } from './quiz.service';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @ApiPost('lesson/:lessonId/generate')
  @Roles(SystemRoles.LEARNER)
  @ApiOkInsertResultExample(QuizRecordDto)
  create(@Param() params: LessonIdDto, @Req() req: Request) {
    return this.quizService.create(params.lessonId, req.user.id);
  }

  @ApiGet('lesson/:lessonId')
  @Roles(SystemRoles.LEARNER)
  @ApiOkResponseExample(ListQuizDto)
  getByLessonId(@Param() params: LessonIdDto) {
    return this.quizService.getByLessonId(params.lessonId);
  }
}
