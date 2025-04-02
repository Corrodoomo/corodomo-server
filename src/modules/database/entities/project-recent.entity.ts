import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Project } from './project.entity';
import { User } from './user.entity';

@Index('folers_pkey', ['id'], { unique: true })
@Entity('project_recents', { schema: 'public' })
export class ProjectRecent extends BaseEntity {
  @ManyToOne(() => User, (users) => users.projectRecents, { nullable: false })
  @JoinColumn([{ name: 'accessed_by', referencedColumnName: 'id' }])
  accessedBy: User | string;

  @ManyToOne(() => Project, (project) => project.recents, { nullable: false })
  @JoinColumn([{ name: 'project_id', referencedColumnName: 'id' }])
  project: Project;

  @Column('timestamp with time zone', { name: 'accessed_at', default: Date.now() })
  accessedAt: Date;
}
