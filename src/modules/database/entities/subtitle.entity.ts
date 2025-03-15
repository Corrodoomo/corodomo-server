import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Lesson } from './lesson.entity';

@Index('subtitles_pkey', ['id'], { unique: true })
@Entity('subtitles', { schema: 'public' })
export class Subtitle extends BaseEntity {
  @Column('character varying', { name: 'text' })
  text: string;

  @Column('double precision', {
    name: 'duration',
    default: 0,
  })
  duration: number;

  @Column('double precision', { name: 'offset', default: 0 })
  offset: number;

  @Column('character varying', { name: 'language' })
  language: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.subtitles)
  @JoinColumn([{ name: 'lesson_id', referencedColumnName: 'id' }])
  lesson: Lesson;
}
