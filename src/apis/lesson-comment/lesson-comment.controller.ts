import { Body, Controller, Param, Req } from '@nestjs/common';

import { Delete, Post, Put, Roles } from '@common/decorators';
import { CommentIdDto } from '@common/dtos/id.dto';
import { CreateLessonCommentDto, UpdateLessonCommentDto } from '@common/dtos/lesson-comment.dto';
import { SystemRoles } from '@common/enums';
import { Request } from '@common/models';

import { LessonCommentService } from './lesson-comment.service';

@Controller('lesson-comments')
export class LessonCommentController {
  constructor(private readonly commentService: LessonCommentService) {}

  @Post('/send')
  @Roles([SystemRoles.LEARNER])
  create(@Body() body: CreateLessonCommentDto, @Req() req: Request) {
    return this.commentService.create(req.user.id, body);
  }

  @Put('/:commentId')
  @Roles([SystemRoles.LEARNER])
  update(@Param() param: CommentIdDto, @Body() body: UpdateLessonCommentDto, @Req() req: Request) {
    return this.commentService.update(req.user.id, param.commentId, body);
  }

  @Delete('/:commentId')
  @Roles([SystemRoles.LEARNER])
  delete(@Param() param: CommentIdDto, @Req() req: Request) {
    return this.commentService.delete(req.user.id, param.commentId);
  }
}
