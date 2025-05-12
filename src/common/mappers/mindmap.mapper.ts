import { Mindmap } from '@modules/database/entities/mindmap.entity';
import { ApiProperty } from '@nestjs/swagger';

import { BelongToUserMapper, ItemsMapper } from './common.mapper';

export class MindmapRecordMapper extends BelongToUserMapper {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  emoji: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  positionX: number;

  @ApiProperty()
  positionY: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  parentNodeId: string;

  @ApiProperty()
  lesson: { id: string };
}

export class GroupMindmapDto extends ItemsMapper<Mindmap> {
  constructor(blogs: Mindmap[]) {
    super(GroupMindmapDto.groupMindmap(blogs));
  }

  public static groupMindmap(mindmap: Mindmap[]) {
    // Create a map to store blogs
    const map = new Map();

    // Set all blogs to map
    mindmap.forEach((item) => {
      map.set(item.id, item);
    });

    // Loop through all blogs
    mindmap.forEach((item) => {
      if (item.parentNodeId && map.has(item.parentNodeId)) {
        const parent = map.get(item.parentNodeId);
        parent.children = parent.children ?? [];
        parent.children.push(item);
      }
    });

    return mindmap.filter((item) => !item.parentNodeId);
  }
}
