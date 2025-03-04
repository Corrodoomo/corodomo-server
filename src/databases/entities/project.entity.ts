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

@Index("projects_pkey", ["id"], { unique: true })
@Entity("projects", { schema: "public" })
export class Project {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @Column("character varying", { name: "desc", nullable: true })
  desc: string | null;

  @Column("timestamp without time zone", { name: "started_at", nullable: true })
  startedAt: Date | null;

  @Column("timestamp without time zone", { name: "ended_at", nullable: true })
  endedAt: Date | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => GroupTask, (groupTask) => groupTask.project)
  groupTasks: GroupTask[];

  @ManyToOne(() => Workspace, (workspace) => workspace.projects)
  @JoinColumn([{ name: "workspace_id", referencedColumnName: "id" }])
  workspace: Workspace;
}
