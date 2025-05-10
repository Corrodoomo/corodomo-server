import { BadRequestException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';

import { DeleteResultDto, UpdateResultDto } from '@common/dtos';
import { MindmapDto } from '@common/dtos/mindmap.dto';
import { Messages } from '@common/enums';
import { GroupMindmapDto } from '@common/mappers/mindmap.mapper';

import { MindmapRepository } from './mindmap.repository';

@Injectable()
export class MindmapService {
  constructor(private readonly mindmapRepository: MindmapRepository) {}

  async createNode(lessonId: string, body: MindmapDto) {
    return this.mindmapRepository.save({
      ...body,
      lesson: {
        id: lessonId,
      },
    });
  }

  async getMindmapsByLessonId(lessonId: string) {
    const mindmaps = await this.mindmapRepository.find({ where: { lesson: { id: lessonId } } });
    return new GroupMindmapDto(mindmaps);
  }

  async updateNode(userId: string, nodeId: string, body: MindmapDto) {
    // Get blog by id
    const node = await this.mindmapRepository.getRawOne(nodeId, ['id']);

    // Check if blog is empty
    if (isEmpty(node)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Create blog
    await this.mindmapRepository.update(nodeId, body);

    // Return result
    return new UpdateResultDto(1);
  }

  async deleteNode(nodeId: string) {
    // Get blog by id
    const node = await this.mindmapRepository.getRawOne(nodeId, ['id']);

    // Check if blog is empty
    if (isEmpty(node)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }
    // Create blog
    await this.mindmapRepository.delete(nodeId);

    // Return result
    return new DeleteResultDto(1);
  }
}
