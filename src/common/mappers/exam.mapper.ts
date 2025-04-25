import { Exam } from '@modules/database/entities';

import { ItemMapper } from './common.mapper';

export type TDetailExam = {
  id: string;
  title: string;
  participantsCount: number;
  duration: number;
  type: string;
  totalSections: number;
  totalQuestions: number;
  parts: TExamPart[];
};

export type TExamPart = {
  id: string;
  title: string;
  audioUrl: any;
  skill: string;
  questions: TQuestion[];
};

export type TQuestion = {
  no: number;
  id: string;
  title: string;
  answer: string;
  choices: string[];
};

/**
 * Re-map a object into AuthMetadataMapper
 */
export class DetailExamMapper extends ItemMapper<TDetailExam | null> {
  constructor(exam: Exam | null) {
    super(DetailExamMapper.handleMapper(exam));
  }

  static handleMapper(exam: Exam | null): TDetailExam | null {
    if (!exam) {
      return null;
    }

    const { id, title, duration, participantsCount, totalQuestions, totalSections, type, parts } = exam;

    let questionNo = 0;

    return {
      id,
      title,
      duration,
      participantsCount,
      totalQuestions,
      totalSections,
      type,
      parts: parts.map(({ id, title, audioUrl, questions, skill }) => ({
        id,
        audioUrl,
        skill,
        title,
        questions: questions.map(({ id, answer, choices, title }) => {
          questionNo++;

          return {
            no: questionNo,
            id,
            answer,
            title,
            choices: choices.split('|'),
          };
        }),
      })),
    };
  }
}
