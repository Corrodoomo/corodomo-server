import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Task } from "./task.entity";

@Index("task_comments_pkey", ["id"], { unique: true })
@Entity("task_comments", { schema: "public" })
export class TaskComment {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "content", nullable: true })
  content: string | null;

  @Column("uuid", { name: "created_by", nullable: true })
  createdBy: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Task, (task) => task.taskComments)
  @JoinColumn([{ name: "task_id", referencedColumnName: "id" }])
  task: Task;
}
