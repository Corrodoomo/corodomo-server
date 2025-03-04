import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ExamSection } from "./exam-section.entity";
import { Question } from "./question.entity";

@Index("exam_parts_pkey", ["id"], { unique: true })
@Entity("exam_parts", { schema: "public" })
export class ExamPart {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => ExamSection, (examSections) => examSections.examParts)
  @JoinColumn([{ name: "exam_section_id", referencedColumnName: "id" }])
  examSection: ExamSection;

  @OneToMany(() => Question, (questions) => questions.examPart)
  questions: Question[];
}
