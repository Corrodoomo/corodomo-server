import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";

@Index("blogs_pkey", ["id"], { unique: true })
@Entity("blogs", { schema: "public" })
export class Blog extends BaseEntity {
  @Column("character varying", { name: "title" })
  title: string;

  @Column("character varying", { name: "content" })
  content: string;

  @ManyToOne(() => User, (users) => users.blogs, { nullable: false })
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: User;
}
