import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ExamPart } from "./exam-part.entity";
import { Exam } from "./exam.entity";
import { BaseEntity } from "./base.entity";

@Index("exam_sections_pkey", ["id"], { unique: true })
@Entity("exam_sections", { schema: "public" })
export class ExamSection extends BaseEntity {
  @Column("character varying", { name: "title" })
  title: string | null;

  @Column("character varying", { name: "skill" })
  skill: string | null;

  @Column("double precision", { name: "duration" })
  duration: number;

  @OneToMany(() => ExamPart, (examPart) => examPart.examSection)
  examParts: ExamPart[];

  @ManyToOne(() => Exam, (exams) => exams.examSections)
  @JoinColumn([{ name: "exam_id", referencedColumnName: "id" }])
  exam: Exam;
}
