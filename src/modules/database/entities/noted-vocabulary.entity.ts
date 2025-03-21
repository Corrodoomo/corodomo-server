import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Lesson } from './lesson.entity';
import { User } from './user.entity';

@Index('noted_vocabularies_pkey', ['id'], { unique: true })
@Entity('noted_vocabularies', { schema: 'public' })
export class NotedVocabulary extends BaseEntity {
  @Column('character varying', { name: 'text' })
  text: string;

  @Column('character varying', { name: 'translated_text' })
  translatedText: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.notedVocabularies, { nullable: false })
  @JoinColumn([{ name: 'lesson_id', referencedColumnName: 'id' }])
  lesson: Lesson;

  @ManyToOne(() => User, (user) => user.notedVocabularies, { nullable: false })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy: string | User;
}
