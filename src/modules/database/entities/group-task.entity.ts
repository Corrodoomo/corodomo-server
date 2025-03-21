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
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Index("group_tasks_pkey", ["id"], { unique: true })
@Entity("group_tasks", { schema: "public" })
export class GroupTask extends BaseEntity {
  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @Column("character varying", { name: "theme_color", nullable: true })
  themeColor: string | null;

  @ManyToOne(() => User, (user) => user.groupTasks, { nullable: false })
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: User;

  @ManyToOne(() => Project, (project) => project.groupTasks, { nullable: false })
  @JoinColumn([{ name: "project_id", referencedColumnName: "id" }])
  project: Project;

  @OneToMany(() => Task, (task) => task.groupTask)
  tasks: Task[];
}
