import { Column, Entity, Index, OneToMany } from "typeorm";
import { Blog } from "./blog.entity";
import { Exam } from "./exam.entity";
import { LessonComment } from "./lesson-comment.entity";
import { Lesson } from "./lesson.entity";
import { Note } from "./note.entity";
import { Song } from "./song.entity";
import { Workspace } from "./workspace.entity";
import { BaseEntity } from "./base.entity";
import { GroupTask } from "./group-task.entity";
import { TaskComment } from "./task-comment.entity";

@Index("users_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class User extends BaseEntity {
  @Column("character varying", { name: "username"})
  username: string;

  @Column("character varying", { name: "password" })
  password: string;

  @Column("character varying", { name: "role" })
  role: string;

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

  @OneToMany(() => GroupTask, (groupTask) => groupTask.createdBy)
  groupTasks: GroupTask[];

  @OneToMany(() => TaskComment, (taskComment) => taskComment.createdBy)
  taskComments: TaskComment[];
}
