import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Lesson } from './lesson.entity';
import { User } from './user.entity';

@Index('lesson_notes_pkey', ['id'], { unique: true })
@Entity('lesson_notes', { schema: 'public' })
export class LessonNote extends BaseEntity {
  @Column('character varying', { name: 'content' })
  content: string;

  @ManyToOne(() => User, (user) => user.lessonComments, { nullable: false })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy: User | string;

  @ManyToOne(() => Lesson, (lesson) => lesson.notes, { nullable: false })
  @JoinColumn([{ name: 'lesson_id', referencedColumnName: 'id' }])
  lesson: Lesson;
}
