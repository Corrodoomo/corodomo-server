import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Project } from "./project.entity";
import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";

@Index("workspaces_pkey", ["id"], { unique: true })
@Entity("workspaces", { schema: "public" })
export class Workspace extends BaseEntity {
  @Column("character varying", { name: "title"})
  title: string;

  @Column("character varying", { name: "members", nullable: true })
  members: string | null;

  @OneToMany(() => Project, (projects) => projects.workspace)
  projects: Project[];

  @ManyToOne(() => User, (users) => users.workspaces, { nullable: false })
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: User;
}
