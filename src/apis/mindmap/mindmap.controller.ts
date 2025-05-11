import { Mindmap } from '@modules/database/entities/mindmap.entity';
import { Policy } from '@modules/policy/policy.decorator';
import { Body, Controller, Param, Req } from '@nestjs/common';

import {
  ApiOkDeleteResultExample,
  ApiOkItemsExample,
  ApiOkUpdateResultExample,
} from '@common/decorators/example.decorator';
import { ApiDelete, ApiGet, ApiPost, ApiPut } from '@common/decorators/http.decorator';
import { LessonIdDto } from '@common/dtos/id.dto';
import { MindmapDto } from '@common/dtos/mindmap.dto';
import { MindmapRecordMapper } from '@common/mappers/mindmap.mapper';
import { Request } from '@common/models';

import { MindmapService } from './mindmap.service';

@Controller('mindmap')
export class MindmapController {
  constructor(private readonly mindmapService: MindmapService) {}

  @ApiGet('/:lessonId')
  @Policy('read', 'mindmap')
  @ApiOkItemsExample(MindmapRecordMapper)
  getMindmapByLessonId(@Param() params: LessonIdDto) {
    return this.mindmapService.getMindmapsByLessonId(params.lessonId);
  }

  @ApiPost('/:lessonId')
  @Policy('create', 'mindmap')
  @ApiOkItemsExample(MindmapRecordMapper)
  createNode(@Param() params: LessonIdDto, @Body() body: MindmapDto) {
    return this.mindmapService.createNode(params.lessonId, body);
  }

  @ApiPut('/:nodeId')
  @Policy('update', 'mindmap')
  @ApiOkUpdateResultExample(Mindmap)
  updateNode(@Param() params: LessonIdDto, @Body() body: MindmapDto, @Req() request: Request) {
    return this.mindmapService.updateNode(request.user.id, params.lessonId, body);
  }

  @ApiDelete('/:nodeId')
  @Policy('delete', 'mindmap')
  @ApiOkItemsExample(MindmapRecordMapper)
  @ApiOkDeleteResultExample()
  deleteNode(@Param() params: LessonIdDto) {
    return this.mindmapService.deleteNode(params.lessonId);
  }
}
