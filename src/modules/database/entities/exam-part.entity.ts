import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Exam } from './exam.entity';
import { Question } from './question.entity';

@Index('exam_parts_pkey', ['id'], { unique: true })
@Entity('exam_parts', { schema: 'public' })
export class ExamPart extends BaseEntity {
  @Column('character varying', { name: 'title' })
  title: string;

  @Column('character varying', { name: 'audio_url' })
  audioUrl: string;

  @Column('character varying', { name: 'skill' })
  skill: string;

  @ManyToOne(() => Exam, (exam) => exam.parts, { nullable: false })
  @JoinColumn([{ name: 'exam_section_id', referencedColumnName: 'id' }])
  exam: Exam;

  @OneToMany(() => Question, (questions) => questions.examPart)
  questions: Question[];
}
