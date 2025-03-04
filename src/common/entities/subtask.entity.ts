import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('sub_tasks')
export class SubTask {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'theme_color' })
    themeColor: string;

    @Column({ name: 'task_id' })
    taskId: string;

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
