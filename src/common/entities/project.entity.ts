import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'desc' })
    desc: string;

    @Column({ name: 'workspace_id' })
    workspaceId: string;

    @Column({ name: 'started_at' })
    startedAt: Date;

    @Column({ name: 'ended_at' })
    endedAt: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
