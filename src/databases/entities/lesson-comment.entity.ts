import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Lesson } from "./lesson.entity";

@Index("lesson_comments_pkey", ["id"], { unique: true })
@Entity("lesson_comments", { schema: "public" })
export class LessonComment {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "content", nullable: true })
  content: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => User, (user) => user.lessonComments)
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: User;

  @ManyToOne(() => Lesson, (lesson) => lesson.lessonComments)
  @JoinColumn([{ name: "lesson_id", referencedColumnName: "id" }])
  lesson: Lesson;
}
