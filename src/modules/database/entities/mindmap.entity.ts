import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Lesson } from './lesson.entity';
import { User } from './user.entity';

@Index('mindmap_pkey', ['id'], { unique: true })
@Entity('mindmap', { schema: 'public' })
export class Mindmap extends BaseEntity {
  @Column('character varying', { name: 'uuid' })
  uuid: string;

  @Column('character varying', { name: 'color', nullable: true, length: 16 })
  color: string;

  @Column('character varying', { name: 'emoji', length: 8 })
  emoji: string;

  @Column('integer', { name: 'label' })
  label: string;

  @Column('character varying', { name: 'position_x', default: 0 })
  positionX: number;

  @Column('character varying', { name: 'position_y', default: 0 })
  positionY: number;

  @Column('character varying', { name: 'description' })
  description: string;

  @Column('character varying', { name: 'parent_node_id', nullable: true })
  parentNodeId: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.id, { nullable: false })
  @JoinColumn([{ name: 'lesson_id', referencedColumnName: 'id' }])
  lesson: Lesson;

  @ManyToOne(() => User, (users) => users.mindmaps, { nullable: false })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy: User | string;
}
