import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Project } from "./project.entity";
import { Task } from "./task.entity";

@Index("group_tasks_pkey", ["id"], { unique: true })
@Entity("group_tasks", { schema: "public" })
export class GroupTask {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @Column("character varying", { name: "theme_color", nullable: true })
  themeColor: string | null;

  @Column("uuid", { name: "created_by", nullable: true })
  createdBy: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Project, (project) => project.groupTasks)
  @JoinColumn([{ name: "project_id", referencedColumnName: "id" }])
  project: Project;

  @OneToMany(() => Task, (task) => task.groupTask)
  tasks: Task[];
}
