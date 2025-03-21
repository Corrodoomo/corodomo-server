import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";

@Index("notes_pkey", ["id"], { unique: true })
@Entity("notes", { schema: "public" })
export class Note extends BaseEntity {
  @Column("character varying", { name: "title" })
  title: string;

  @Column("character varying", { name: "status", default: 'pending' })
  status: string;

  @ManyToOne(() => User, (user) => user.notes, { nullable: false })
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: User;
}
