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

@Index("workspaces_pkey", ["id"], { unique: true })
@Entity("workspaces", { schema: "public" })
export class Workspace {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @Column("character varying", { name: "members", nullable: true })
  members: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => Project, (projects) => projects.workspace)
  projects: Project[];

  @ManyToOne(() => User, (users) => users.workspaces)
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: User;
}
