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

@Index("exam_sections_pkey", ["id"], { unique: true })
@Entity("exam_sections", { schema: "public" })
export class ExamSection {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @Column("character varying", { name: "skill", nullable: true })
  skill: string | null;

  @Column("double precision", {
    name: "duration",
    nullable: true,
    precision: 53,
  })
  duration: number | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => ExamPart, (examPart) => examPart.examSection)
  examParts: ExamPart[];

  @ManyToOne(() => Exam, (exams) => exams.examSections)
  @JoinColumn([{ name: "exam_id", referencedColumnName: "id" }])
  exam: Exam;
}
