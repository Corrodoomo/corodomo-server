import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Lesson } from './lesson.entity';
import { User } from './user.entity';

@Index('folers_pkey', ['id'], { unique: true })
@Entity('lesson_recents', { schema: 'public' })
export class LessonRecent extends BaseEntity {
  @ManyToOne(() => User, (users) => users.lessonRecents, { nullable: false })
  @JoinColumn([{ name: 'accessed_by', referencedColumnName: 'id' }])
  accessor: User | string;

  @ManyToOne(() => Lesson, (lesson) => lesson.lessonRecents, { nullable: false })
  @JoinColumn([{ name: 'lesson_id', referencedColumnName: 'id' }])
  lesson: Lesson;

  @Column('timestamp with time zone', { name: 'accessed_at', default: Date.now() })
  accessedAt: Date;
}
