import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('workspaces')
export class Workspace {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'owner' })
    owner: string;

    @Column({ name: 'members' })
    members: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
