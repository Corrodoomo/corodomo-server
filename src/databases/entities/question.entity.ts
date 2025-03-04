import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { QuestionChoice } from "./question-choice.entity";
import { ExamPart } from "./exam-part.entity";

@Index("questions_pkey", ["id"], { unique: true })
@Entity("questions", { schema: "public" })
export class Question {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @Column("character varying", { name: "answer", nullable: true })
  answer: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(
    () => QuestionChoice,
    (questionChoice) => questionChoice.question
  )
  questionChoices: QuestionChoice[];

  @ManyToOne(() => ExamPart, (examPart) => examPart.questions)
  @JoinColumn([{ name: "exam_part_id", referencedColumnName: "id" }])
  examPart: ExamPart;
}
