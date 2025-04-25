import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";
import { ExamPart } from "./exam-part.entity";

@Index("exams_pkey", ["id"], { unique: true })
@Entity("exams", { schema: "public" })
export class Exam extends BaseEntity {
  @Column("character varying", { name: "title" })
  title: string;

  @Column("integer", { name: "participants_count", default: 0 })
  participantsCount: number;

  @Column("character varying", { name: "categories" })
  categories: string;

  @Column('character varying', { name: 'type' })
  type: string;

  @Column('double precision', { name: 'duration' })
  duration: number;

  @Column('integer', { name: 'total_sections' })
  totalSections: number;

  @Column('integer', { name: 'total_questions' })
  totalQuestions: number;

  @OneToMany(() => ExamPart, (part) => part.exam)
  parts: ExamPart[];

  @ManyToOne(() => User, (user) => user.exams, { nullable: false })
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: User;
}
