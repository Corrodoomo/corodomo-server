import { Body, Controller, Param, Req } from '@nestjs/common';

import { ApiDelete, ApiPost, ApiPut } from '@common/decorators';
import {
  ApiOkDeleteResultExample,
  ApiOkInsertResultExample,
  ApiOkUpdateResultExample,
} from '@common/decorators/example.decorator';
import { CommentIdDto } from '@common/dtos/id.dto';
import {
  CreateLessonCommentDto,
  LessonCommentRecordDto,
  UpdateLessonCommentDto,
} from '@common/dtos/lesson-comment.dto';
import { Request } from '@common/models';

import { LessonCommentService } from './lesson-comment.service';
import { Policy } from '@modules/policy/policy.decorator';

@Controller('lesson-comments')
export class LessonCommentController {
  constructor(private readonly commentService: LessonCommentService) {}

  @ApiPost('/send')
  @Policy('create', 'lesson_comments')
  @ApiOkInsertResultExample(LessonCommentRecordDto)
  create(@Body() body: CreateLessonCommentDto, @Req() req: Request) {
    return this.commentService.create(req.user.id, body);
  }

  @ApiPut('/:commentId')
  @Policy('update', 'lesson_comments')
  @ApiOkUpdateResultExample(LessonCommentRecordDto)
  update(@Param() param: CommentIdDto, @Body() body: UpdateLessonCommentDto, @Req() req: Request) {
    return this.commentService.update(req.user.id, param.commentId, body);
  }

  @ApiDelete('/:commentId')
  @Policy('delete', 'lesson_comments')
  @ApiOkDeleteResultExample()
  delete(@Param() param: CommentIdDto, @Req() req: Request) {
    return this.commentService.delete(req.user.id, param.commentId);
  }
}
