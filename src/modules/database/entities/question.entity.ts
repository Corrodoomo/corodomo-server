import { BaseEntity } from './base.entity';
import { ExamPart } from './exam-part.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Index('questions_pkey', ['id'], { unique: true })
@Entity('questions', { schema: 'public' })
export class Question extends BaseEntity {
	@Column('character varying', { name: 'title' })
	title: string;

	@Column('character varying', { name: 'answer' })
	answer: string;

	@Column('character varying', { name: 'choices' })
	choices: string;

	@ManyToOne(() => ExamPart, (examPart) => examPart.questions, { nullable: false })
	@JoinColumn([{ name: 'exam_part_id', referencedColumnName: 'id' }])
	examPart: ExamPart;
}
