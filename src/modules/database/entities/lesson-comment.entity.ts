import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Lesson } from "./lesson.entity";
import { BaseEntity } from "./base.entity";

@Index("lesson_comments_pkey", ["id"], { unique: true })
@Entity("lesson_comments", { schema: "public" })
export class LessonComment extends BaseEntity {
  @Column("character varying", { name: "content", nullable: true })
  content: string | null;

  @ManyToOne(() => User, (user) => user.lessonComments)
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: User;

  @ManyToOne(() => Lesson, (lesson) => lesson.lessonComments)
  @JoinColumn([{ name: "lesson_id", referencedColumnName: "id" }])
  lesson: Lesson;
}
