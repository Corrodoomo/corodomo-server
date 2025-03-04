import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Task } from "./task.entity";

@Index("sub_tasks_pkey", ["id"], { unique: true })
@Entity("sub_tasks", { schema: "public" })
export class SubTask {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @Column("character varying", { name: "theme_color", nullable: true })
  themeColor: string | null;

  @Column("character varying", { name: "assignees", nullable: true })
  assignees: string | null;

  @Column("character varying", { name: "tags", nullable: true })
  tags: string | null;

  @Column("timestamp without time zone", { name: "started_at", nullable: true })
  startedAt: Date | null;

  @Column("timestamp without time zone", { name: "ended_at", nullable: true })
  endedAt: Date | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Task, (task) => task.subTasks)
  @JoinColumn([{ name: "task_id", referencedColumnName: "id" }])
  task: Task;
}
