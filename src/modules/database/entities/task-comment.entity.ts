import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Task } from "./task.entity";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Index("task_comments_pkey", ["id"], { unique: true })
@Entity("task_comments", { schema: "public" })
export class TaskComment extends BaseEntity {
  @Column("character varying", { name: "content", nullable: true })
  content: string | null;
  
  @ManyToOne(() => User, (user) => user.taskComments, { nullable: false })
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: User;

  @ManyToOne(() => Task, (task) => task.taskComments, { nullable: false })
  @JoinColumn([{ name: "task_id", referencedColumnName: "id" }])
  task: Task;
}
