import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('exams')
export class Exam {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'creator' })
    creator: string;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'participants_count' })
    participantsCount: number;

    @Column({ name: 'categories' })
    categories: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
