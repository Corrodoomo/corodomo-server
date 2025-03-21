import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Lesson } from './lesson.entity';
import { User } from './user.entity';

@Index('lesson_comments_pkey', ['id'], { unique: true })
@Entity('lesson_comments', { schema: 'public' })
export class LessonComment extends BaseEntity {
  @Column('character varying', { name: 'content', nullable: true })
  content: string | null;

  @Column('uuid', { name: 'reply_id', nullable: true })
  replyId: string | null;

  @ManyToOne(() => User, (user) => user.lessonComments, { nullable: false })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy: User;

  @ManyToOne(() => Lesson, (lesson) => lesson.lessonComments, { nullable: false })
  @JoinColumn([{ name: 'lesson_id', referencedColumnName: 'id' }])
  lesson: Lesson;
}
