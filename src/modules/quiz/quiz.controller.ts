import { Controller, Param, Req } from '@nestjs/common';

import { Post, Roles } from '@common/decorators';
import { SystemRoles } from '@common/enums';
import { Request } from '@common/models';

import { QuizService } from './quiz.service';

@Controller('quizes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('lesson/:lessonId')
  @Roles([SystemRoles.LEARNER])
  create(@Param('lessonId') lessonId: string, @Req() req: Request) {
    return this.quizService.create(lessonId, req.user.id);
  }
}
