import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { GroupTask } from './group-task.entity';
import { ProjectRecent } from './project-recent.entity';
import { Workspace } from './workspace.entity';

@Index('projects_pkey', ['id'], { unique: true })
@Entity('projects', { schema: 'public' })
export class Project extends BaseEntity {
  @Column('character varying', { name: 'name' })
  name: string;

  @Column('character varying', { name: 'description' })
  description: string;

  @Column('character varying', { name: 'theme' })
  theme: string;

  @Column('timestamp without time zone', { name: 'start_at' })
  startAt: Date;

  @Column('timestamp without time zone', { name: 'end_at' })
  endAt: Date;

  @OneToMany(() => GroupTask, (groupTask) => groupTask.project)
  groupTasks: GroupTask[];

  @OneToMany(() => ProjectRecent, (recents) => recents.project)
  recents: ProjectRecent[];

  @ManyToOne(() => Workspace, (workspace) => workspace.projects, { nullable: false })
  @JoinColumn([{ name: 'workspace_id', referencedColumnName: 'id' }])
  workspace: Workspace | string;
}

export type ProjectRaw = Omit<Project, 'workspace'> & { workspaceId: string };
