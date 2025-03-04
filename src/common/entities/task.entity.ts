import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'theme_color' })
    themeColor: string;

    @Column({ name: 'list_task_id' })
    listTaskId: string;

    @Column({ name: 'assignees' })
    assignees: string;

    @Column({ name: 'tags' })
    tags: string;

    @Column({ name: 'started_at' })
    startedAt: Date;

    @Column({ name: 'ended_at' })
    endedAt: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
