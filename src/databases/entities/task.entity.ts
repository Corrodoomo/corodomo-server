import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { SubTask } from "./sub-task.entity";
import { TaskComment } from "./task-comment.entity";
import { GroupTask } from "./group-task.entity";

@Index("tasks_pkey", ["id"], { unique: true })
@Entity("tasks", { schema: "public" })
export class Task {
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

  @OneToMany(() => SubTask, (subTask) => subTask.task)
  subTasks: SubTask[];

  @OneToMany(() => TaskComment, (taskComment) => taskComment.task)
  taskComments: TaskComment[];

  @ManyToOne(() => GroupTask, (groupTask) => groupTask.tasks)
  @JoinColumn([{ name: "group_task_id", referencedColumnName: "id" }])
  groupTask: GroupTask;
}
