import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Question } from "./question.entity";

@Index("question_choices_pkey", ["id"], { unique: true })
@Entity("question_choices", { schema: "public" })
export class QuestionChoice {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "content", nullable: true })
  content: string | null;

  @Column("character varying", { name: "option", nullable: true })
  option: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Question, (question) => question.questionChoices)
  @JoinColumn([{ name: "question_id", referencedColumnName: "id" }])
  question: Question;
}
