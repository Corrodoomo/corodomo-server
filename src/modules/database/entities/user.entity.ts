import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Blog } from './blog.entity';
import { Exam } from './exam.entity';
import { Folder } from './folder.entity';
import { GroupTask } from './group-task.entity';
import { LessonComment } from './lesson-comment.entity';
import { LessonNote } from './lesson-note.entity';
import { LessonRecent } from './lesson-recent.entity';
import { Lesson } from './lesson.entity';
import { Mindmap } from './mindmap.entity';
import { Note } from './note.entity';
import { NotedVocabulary } from './noted-vocabulary.entity';
import { PricingPlan } from './pricing-plan.entity';
import { ProjectRecent } from './project-recent.entity';
import { Project } from './project.entity';
import { Role } from './role.entity';
import { Song } from './song.entity';
import { TaskComment } from './task-comment.entity';
import { Task } from './task.entity';
import { Workspace } from './workspace.entity';

@Index('users_pkey', ['id'], { unique: true })
@Entity('users', { schema: 'public' })
export class User extends BaseEntity {
  @Column('character varying', { name: 'email' })
  email: string;

  @Column('character varying', { name: 'password' })
  password: string;

  @Column('character varying', { name: 'name', nullable: true })
  name: string;

  @Column('boolean', { name: 'email_verified', default: false })
  emailVerified: boolean;

  @Column('character varying', { name: 'avatar_url' })
  avatarUrl: string;

  @Column('character varying', { name: 'auth_provider', default: 'corodomo_system' })
  authProvider: string;

  @OneToOne(() => Role, (role) => role.user)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToOne(() => PricingPlan, (pricingPlan) => pricingPlan.user)
  @JoinColumn({ name: 'pricing_plan_id' })
  pricingPlan: PricingPlan;

  @OneToMany(() => Blog, (blog) => blog.createdBy)
  blogs: Blog[];

  @OneToMany(() => Exam, (exam) => exam.createdBy)
  exams: Exam[];

  @OneToMany(() => LessonComment, (lessonComment) => lessonComment.createdBy)
  lessonComments: LessonComment[];

  @OneToMany(() => Lesson, (lesson) => lesson.createdBy)
  lessons: Lesson[];

  @OneToMany(() => Note, (note) => note.createdBy)
  notes: Note[];

  @OneToMany(() => Song, (song) => song.createdBy)
  songs: Song[];

  @OneToMany(() => Workspace, (workspace) => workspace.createdBy)
  workspaces: Workspace[];

  @OneToMany(() => Project, (project) => project.createdBy)
  projects: Project[];

  @OneToMany(() => GroupTask, (groupTask) => groupTask.createdBy)
  groupTasks: GroupTask[];

  @OneToMany(() => TaskComment, (taskComment) => taskComment.createdBy)
  taskComments: TaskComment[];

  @OneToMany(() => Folder, (folder) => folder.createdBy)
  folders: Folder[];

  @OneToMany(() => NotedVocabulary, (notedVocabulary) => notedVocabulary.createdBy)
  notedVocabularies: NotedVocabulary[];

  @OneToMany(() => LessonRecent, (lessonRecent) => lessonRecent.accessedBy)
  lessonRecents: LessonRecent[];

  @OneToMany(() => ProjectRecent, (projectRecent) => projectRecent.accessedBy)
  projectRecents: ProjectRecent[];

  @OneToOne(() => LessonNote, (lessonNote) => lessonNote.createdBy)
  lessonNotes: LessonNote[];

  @OneToOne(() => Task, (task) => task.createdBy)
  tasks: Task[];

  @OneToMany(() => Mindmap, (mindmap) => mindmap.createdBy)
  mindmaps: Mindmap[];
}
