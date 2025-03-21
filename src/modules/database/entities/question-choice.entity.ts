import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Question } from "./question.entity";
import { BaseEntity } from "./base.entity";

@Index("question_choices_pkey", ["id"], { unique: true })
@Entity("question_choices", { schema: "public" })
export class QuestionChoice extends BaseEntity {
  @Column("character varying", { name: "content" })
  content: string;

  @Column("character varying", { name: "option" })
  option: string;

  @ManyToOne(() => Question, (question) => question.questionChoices, { nullable: false })
  @JoinColumn([{ name: "question_id", referencedColumnName: "id" }])
  question: Question;
}
