import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Index("tasks_pkey", ["id"], { unique: true })
@Entity("tasks", { schema: "public" })
export class Task extends BaseEntity {
  @Column("character varying", { name: "title" })
  title: string | null;

  @Column("character varying", { name: "theme_color" })
  themeColor: string | null;

  @Column("character varying", { name: "assignees", nullable: true })
  assignees: string | null;

  @Column("character varying", { name: "tags", nullable: true })
  tags: string | null;

  @ManyToOne(() => User, (user) => user.tasks, { nullable: false })
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: User | string;
}
