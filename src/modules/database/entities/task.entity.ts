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
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Index("tasks_pkey", ["id"], { unique: true })
@Entity("tasks", { schema: "public" })
export class Task extends BaseEntity {
  @Column("character varying", { name: "title" })
  title: string | null;

  @Column("character varying", { name: "assignees", nullable: true })
  assignees: string | null;

  @Column("character varying", { name: "tags", nullable: true })
  tags: string | null;

  @Column("timestamp without time zone", { name: "start_at" })
  startAt: Date | null;

  @Column("timestamp without time zone", { name: "end_at" })
  endAt: Date | null;

  @OneToMany(() => SubTask, (subTask) => subTask.task)
  subTasks: SubTask[];

  @OneToMany(() => TaskComment, (taskComment) => taskComment.task)
  taskComments: TaskComment[];

  @ManyToOne(() => GroupTask, (groupTask) => groupTask.tasks, { nullable: false })
  @JoinColumn([{ name: "group_task_id", referencedColumnName: "id" }])
  groupTask: GroupTask;

  @ManyToOne(() => User, (user) => user.tasks, { nullable: false })
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: User | string;
}
