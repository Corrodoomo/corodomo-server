import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('exam_sections')
export class ExamSection {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'exam_id' })
    examId: string;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'skill' })
    skill: string;

    @Column({ name: 'duration' })
    duration: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
