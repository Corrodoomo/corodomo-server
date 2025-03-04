import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Index("notes_pkey", ["id"], { unique: true })
@Entity("notes", { schema: "public" })
export class Note {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @Column("integer", { name: "status", nullable: true })
  status: number | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: User;
}
