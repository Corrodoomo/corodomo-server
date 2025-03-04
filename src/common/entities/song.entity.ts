import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('songs')
export class Song {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'author' })
    author: string;

    @Column({ name: 'duration' })
    duration: number;

    @Column({ name: 'user_id' })
    userId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
