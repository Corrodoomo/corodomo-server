import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { GroupTask } from "./group-task.entity";
import { Workspace } from "./workspace.entity";
import { BaseEntity } from "./base.entity";

@Index("projects_pkey", ["id"], { unique: true })
@Entity("projects", { schema: "public" })
export class Project extends BaseEntity {
  @Column("character varying", { name: "title" })
  title: string;

  @Column("character varying", { name: "desc", nullable: true })
  desc: string | null;

  @Column("timestamp without time zone", { name: "started_at" })
  startedAt: Date;

  @Column("timestamp without time zone", { name: "ended_at" })
  endedAt: Date;

  @OneToMany(() => GroupTask, (groupTask) => groupTask.project)
  groupTasks: GroupTask[];

  @ManyToOne(() => Workspace, (workspace) => workspace.projects, { nullable: false })
  @JoinColumn([{ name: "workspace_id", referencedColumnName: "id" }])
  workspace: Workspace;
}
