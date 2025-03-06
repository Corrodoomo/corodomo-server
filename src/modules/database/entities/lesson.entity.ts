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
import { BaseEntity } from "./base.entity";

@Index("lessons_pkey", ["id"], { unique: true })
@Entity("lessons", { schema: "public" })
export class Lesson extends BaseEntity {
  @Column("character varying", { name: "title" })
  title: string;

  @Column("character varying", { name: "category" })
  category: string;

  @Column("double precision", {
    name: "duration",
    default: 0,
  })
  duration: number;

  @Column("integer", { name: "watched_count", default: 0 })
  watchedCount: number;

  @Column("character varying", { name: "language" })
  language: string;

  @OneToMany(() => LessonComment, (lessonComment) => lessonComment.lesson)
  lessonComments: LessonComment[];

  @ManyToOne(() => User, (user) => user.lessons)
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: User;
}
