import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Index("blogs_pkey", ["id"], { unique: true })
@Entity("blogs", { schema: "public" })
export class Blog {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @Column("character varying", { name: "content", nullable: true })
  content: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => User, (users) => users.blogs)
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: User;
}
