import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Lesson } from './lesson.entity';

@Index('quizzes_pkey', ['id'], { unique: true })
@Entity('quizzes', { schema: 'public' })
export class Quiz extends BaseEntity {
  @Column('character varying', { name: 'question' })
  question: string;

  @Column('character varying', { name: 'choices' })
  choices: string;

  @Column('character', { name: 'answer' })
  answer: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.quizes)
  @JoinColumn([{ name: 'lesson_id', referencedColumnName: 'id' }])
  lesson: Lesson;
}
