import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('questions')
export class Question {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'answer' })
    answer: string;

    @Column({ name: 'exam_part_id' })
    examPartId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
