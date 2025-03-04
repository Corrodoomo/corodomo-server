import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('question_choices')
export class QuestionChoice {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'content' })
    content: string;

    @Column({ name: 'option' })
    option: string;

    @Column({ name: 'question_id' })
    questionId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
