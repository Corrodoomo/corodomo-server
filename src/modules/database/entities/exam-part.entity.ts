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
import { BaseEntity } from "./base.entity";

@Index("exam_parts_pkey", ["id"], { unique: true })
@Entity("exam_parts", { schema: "public" })
export class ExamPart extends BaseEntity {
  @Column("character varying", { name: "title" })
  title: string;

  @ManyToOne(() => ExamSection, (examSections) => examSections.examParts, { nullable: false })
  @JoinColumn([{ name: "exam_section_id", referencedColumnName: "id" }])
  examSection: ExamSection;

  @OneToMany(() => Question, (questions) => questions.examPart)
  questions: Question[];
}
