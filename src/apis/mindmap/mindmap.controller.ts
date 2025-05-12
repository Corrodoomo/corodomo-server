import { Policy } from '@modules/policy/policy.decorator';
import { Body, Controller, Param } from '@nestjs/common';

import {
  ApiOkDeleteResultExample,
  ApiOkInsertResultExample,
  ApiOkItemsExample,
  ApiOkUpdateResultExample,
} from '@common/decorators/example.decorator';
import { ApiDelete, ApiGet, ApiPost, ApiPut } from '@common/decorators/http.decorator';
import { LessonIdDto, MindmapIdDto } from '@common/dtos/id.dto';
import { MindmapDto } from '@common/dtos/mindmap.dto';
import { MindmapRecordMapper } from '@common/mappers/mindmap.mapper';

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
  @ApiOkInsertResultExample(MindmapRecordMapper)
  createNode(@Param() params: LessonIdDto, @Body() body: MindmapDto) {
    return this.mindmapService.createNode(params.lessonId, body);
  }

  @ApiPut('/:nodeId')
  @Policy('update', 'mindmap')
  @ApiOkUpdateResultExample(MindmapRecordMapper)
  updateNode(@Param() params: MindmapIdDto, @Body() body: MindmapDto) {
    return this.mindmapService.updateNode(params.nodeId, body);
  }

  @ApiDelete('/:nodeId')
  @Policy('delete', 'mindmap')
  @ApiOkDeleteResultExample()
  deleteNode(@Param() params: MindmapIdDto) {
    return this.mindmapService.deleteNode(params.nodeId);
  }
}
