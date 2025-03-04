import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('exam_parts')
export class ExamPart {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'exam_section_id' })
    examSectionId: string;

    @Column({ name: 'title' })
    title: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
