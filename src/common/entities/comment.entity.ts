import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'content' })
    content: string;

    @Column({ name: 'task_id' })
    taskId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
