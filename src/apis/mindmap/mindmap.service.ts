import { BadRequestException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';

import { DeleteResultDto, InsertResultDto, UpdateResultDto } from '@common/dtos';
import { MindmapDto } from '@common/dtos/mindmap.dto';
import { Messages } from '@common/enums';
import { ItemsMapper } from '@common/mappers';

import { MindmapRepository } from './mindmap.repository';

@Injectable()
export class MindmapService {
  constructor(private readonly mindmapRepository: MindmapRepository) {}

  async createNode(lessonId: string, body: MindmapDto) {
    const node = await this.mindmapRepository.save({
      ...body,
      lesson: {
        id: lessonId,
      },
    });

    return new InsertResultDto(node, 1);
  }

  async getMindmapsByLessonId(lessonId: string) {
    const mindmaps = await this.mindmapRepository.find({ where: { lesson: { id: lessonId } } });
    return new ItemsMapper(mindmaps);
  }

  async updateNode(nodeId: string, body: MindmapDto) {
    // Get mindmap by id
    const node = await this.mindmapRepository.getRawOne(nodeId, ['id']);

    // Check if blog is empty
    if (isEmpty(node)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Create blog
    await this.mindmapRepository.update(nodeId, body);
    const updatedData = await this.mindmapRepository.findOne({ where: { id: nodeId } });

    // Return result
    return new UpdateResultDto(updatedData, 1);
  }

  async deleteNode(nodeId: string) {
    // Get mindmap by id
    const node = await this.mindmapRepository.getRawOne(nodeId, ['id']);

    // Check if blog is empty
    if (isEmpty(node)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }
    // Create blog
    await this.mindmapRepository.delete(nodeId);

    // Return result
    return new DeleteResultDto(node, 1);
  }
}
