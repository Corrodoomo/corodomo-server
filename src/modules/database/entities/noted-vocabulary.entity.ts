import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Lesson } from './lesson.entity';

@Index('noted_vocabularies_pkey', ['id'], { unique: true })
@Entity('noted_vocabularies', { schema: 'public' })
export class NotedVocabulary extends BaseEntity {
  @Column('character varying', { name: 'content', nullable: true })
  text: string | null;

  @Column('uuid', { name: 'translated_text', nullable: true })
  translatedText: string | null;

  @ManyToOne(() => Lesson, (lesson) => lesson.notedVocabularies, { nullable: false })
  @JoinColumn([{ name: 'lesson_id', referencedColumnName: 'id' }])
  lesson: Lesson;
}
