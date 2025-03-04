import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('lessons')
export class Lesson {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'category' })
    category: string;

    @Column({ name: 'duration' })
    duration: number;

    @Column({ name: 'watched_count' })
    watchedCount: number;

    @Column({ name: 'language' })
    language: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
