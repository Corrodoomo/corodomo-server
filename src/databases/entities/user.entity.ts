import { Column, Entity, Index, OneToMany } from "typeorm";
import { Blog } from "./blog.entity";
import { Exam } from "./exam.entity";
import { LessonComment } from "./lesson-comment.entity";
import { Lesson } from "./lesson.entity";
import { Note } from "./note.entity";
import { Song } from "./song.entity";
import { Workspace } from "./workspace.entity";

@Index("users_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class User {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "username", nullable: true })
  username: string | null;

  @Column("character varying", { name: "password", nullable: true })
  password: string | null;

  @Column("character varying", { name: "role", nullable: true })
  role: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => Blog, (blog) => blog.createdBy)
  blogs: Blog[];

  @OneToMany(() => Exam, (exam) => exam.createdBy)
  exams: Exam[];

  @OneToMany(() => LessonComment, (lessonComment) => lessonComment.createdBy)
  lessonComments: LessonComment[];

  @OneToMany(() => Lesson, (lesson) => lesson.createdBy)
  lessons: Lesson[];

  @OneToMany(() => Note, (note) => note.createdBy)
  notes: Note[];

  @OneToMany(() => Song, (song) => song.createdBy)
  songs: Song[];

  @OneToMany(() => Workspace, (workspace) => workspace.createdBy)
  workspaces: Workspace[];
}
