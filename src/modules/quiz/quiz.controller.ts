import { Controller, Param, Req } from '@nestjs/common';

import { Get, Post, Roles } from '@common/decorators';
import { LessonIdDto } from '@common/dtos/id.dto';
import { ListQuizDto } from '@common/dtos/quiz.dto';
import { SystemRoles } from '@common/enums';
import { Request } from '@common/models';

import { QuizService } from './quiz.service';

@Controller('quizes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('lesson/:lessonId/generate')
  @Roles([SystemRoles.LEARNER])
  create(@Param() params: LessonIdDto, @Req() req: Request) {
    return this.quizService.create(params.lessonId, req.user.id);
  }

  @Get('lesson/:lessonId', { model: ListQuizDto })
  @Roles([SystemRoles.LEARNER])
  getByLessonId(@Param() params: LessonIdDto): Promise<ListQuizDto> {
    return this.quizService.getByLessonId(params.lessonId);
  }
}
