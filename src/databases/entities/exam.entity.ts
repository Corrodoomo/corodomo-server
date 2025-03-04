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

@Index("exams_pkey", ["id"], { unique: true })
@Entity("exams", { schema: "public" })
export class Exam {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @Column("integer", { name: "participants_count", nullable: true })
  participantsCount: number | null;

  @Column("character varying", { name: "categories", nullable: true })
  categories: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => ExamSection, (examSection) => examSection.exam)
  examSections: ExamSection[];

  @ManyToOne(() => User, (user) => user.exams)
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: User;
}
