import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Lesson } from './lesson.entity';

@Index('vocabularies_pkey', ['id'], { unique: true })
@Entity('vocabularies', { schema: 'public' })
export class Vocabulary extends BaseEntity {
  @Column('character varying', { name: 'word' })
  word: string;

  @Column('character varying', { name: 'type' })
  type: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.vocabularies, { nullable: false })
  @JoinColumn([{ name: 'lesson_id', referencedColumnName: 'id' }])
  lesson: Lesson;
}
