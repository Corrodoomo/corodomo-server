import { BaseEntity } from './base.entity';
import { ExamPart } from './exam-part.entity';
import { QuestionChoice } from './question-choice.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Index('questions_pkey', ['id'], { unique: true })
@Entity('questions', { schema: 'public' })
export class Question extends BaseEntity {
	@Column('character varying', { name: 'title' })
	title: string;

	@Column('character varying', { name: 'answer' })
	answer: string;

	@OneToMany(() => QuestionChoice, (questionChoice) => questionChoice.question)
	questionChoices: QuestionChoice[];

	@ManyToOne(() => ExamPart, (examPart) => examPart.questions, { nullable: false })
	@JoinColumn([{ name: 'exam_part_id', referencedColumnName: 'id' }])
	examPart: ExamPart;
}
