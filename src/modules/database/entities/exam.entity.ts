import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ExamSection } from "./exam-section.entity";
import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";

@Index("exams_pkey", ["id"], { unique: true })
@Entity("exams", { schema: "public" })
export class Exam extends BaseEntity {
  @Column("character varying", { name: "title" })
  title: string;

  @Column("integer", { name: "participants_count", default: 0 })
  participantsCount: number;

  @Column("character varying", { name: "categories" })
  categories: string;

  @OneToMany(() => ExamSection, (examSection) => examSection.exam)
  examSections: ExamSection[];

  @ManyToOne(() => User, (user) => user.exams)
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: User;
}
