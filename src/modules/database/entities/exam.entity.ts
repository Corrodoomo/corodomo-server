import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { ExamPart } from './exam-part.entity';
import { User } from './user.entity';

@Index('exams_pkey', ['id'], { unique: true })
@Entity('exams', { schema: 'public' })
export class Exam extends BaseEntity {
  @Column('character varying', { name: 'title' })
  title: string;

  @Column('integer', { name: 'participants_count', default: 0 })
  participantsCount: number;

  @Column('double precision', { name: 'duration' })
  duration: number;

  @Column('character varying', { name: 'type' })
  type: string;

  @Column('integer', { name: 'total_sections' })
  totalSections: string;

  @Column('integer', { name: 'total_questions' })
  totalQuestions: string;

  @OneToMany(() => ExamPart, (part) => part.exam)
  parts: ExamPart[];

  @ManyToOne(() => User, (user) => user.exams, { nullable: false })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy: User;
}
