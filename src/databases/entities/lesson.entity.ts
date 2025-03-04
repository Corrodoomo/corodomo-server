import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { LessonComment } from "./lesson-comment.entity";
import { User } from "./user.entity";

@Index("lessons_pkey", ["id"], { unique: true })
@Entity("lessons", { schema: "public" })
export class Lesson {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @Column("character varying", { name: "category", nullable: true })
  category: string | null;

  @Column("double precision", {
    name: "duration",
    nullable: true,
    precision: 53,
  })
  duration: number | null;

  @Column("integer", { name: "watched_count", nullable: true })
  watchedCount: number | null;

  @Column("character varying", { name: "language", nullable: true })
  language: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => LessonComment, (lessonComment) => lessonComment.lesson)
  lessonComments: LessonComment[];

  @ManyToOne(() => User, (user) => user.lessons)
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: User;
}
