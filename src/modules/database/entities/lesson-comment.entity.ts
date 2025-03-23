import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Lesson } from './lesson.entity';
import { User } from './user.entity';

@Index('lesson_comments_pkey', ['id'], { unique: true })
@Entity('lesson_comments', { schema: 'public' })
export class LessonComment extends BaseEntity {
  @Column('character varying', { name: 'content' })
  content: string;

  @Column('uuid', { name: 'reply_id', nullable: true })
  replyId: string;

  @ManyToOne(() => User, (user) => user.lessonComments, { nullable: false })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy: User | string;

  @ManyToOne(() => Lesson, (lesson) => lesson.comments, { nullable: false })
  @JoinColumn([{ name: 'lesson_id', referencedColumnName: 'id' }])
  lesson: Lesson;
}
