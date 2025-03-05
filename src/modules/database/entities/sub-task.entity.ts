import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Task } from "./task.entity";
import { BaseEntity } from "./base.entity";

@Index("sub_tasks_pkey", ["id"], { unique: true })
@Entity("sub_tasks", { schema: "public" })
export class SubTask extends BaseEntity {
  @Column("character varying", { name: "title" })
  title: string;

  @Column("character varying", { name: "theme_color" })
  themeColor: string;

  @Column("character varying", { name: "assignees" })
  assignees: string;

  @Column("character varying", { name: "tags" })
  tags: string;

  @Column("timestamp without time zone", { name: "started_at" })
  startedAt: Date;

  @Column("timestamp without time zone", { name: "ended_at" })
  endedAt: Date;

  @ManyToOne(() => Task, (task) => task.subTasks)
  @JoinColumn([{ name: "task_id", referencedColumnName: "id" }])
  task: Task;
}
