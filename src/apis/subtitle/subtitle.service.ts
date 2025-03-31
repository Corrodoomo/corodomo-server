import { LessonRepository } from '@app/apis/lesson/lesson.repository';
import { LessonService } from '@app/apis/lesson/lesson.service';
import { Lesson } from '@modules/database/entities';
import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { YoutubeTranscript } from 'youtube-transcript';

import { YOUTUBE_TRANSCRIPT_LANGUAGES } from '@common/constants';
import { InsertResult } from '@common/dtos';
import { Messages } from '@common/enums';

import { SubtitleRepository } from './subtitle.repository';

@Injectable()
export class SubtitleService {
  constructor(
    private readonly subtitleRepository: SubtitleRepository,
    private readonly lessonRepository: LessonRepository,
    private readonly lessonService: LessonService
  ) {}

  /**
   * Create subtitle
   * @param lesson
   */
  async create(lessonId: string, userId: string) {
    // Find lesson
    const lesson = await this.lessonRepository.getRawOne<Lesson>(lessonId, [
      'id',
      'tag',
      'language',
      'full_subtitles AS "fullSubtitles"',
      'youtube_url AS "youtubeUrl"',
      'created_by AS "createdBy"',
    ]);

    // Check lesson
    if (isEmpty(lesson)) {
      throw new BadRequestException();
    }

    // Check permission
    if (String(lesson.createdBy) !== userId) {
      throw new ForbiddenException();
    }

    // Subtitles are created
    if (!isEmpty(lesson.fullSubtitles)) {
      throw new InternalServerErrorException(Messages.ITEM_EXISTED);
    }

    // Fetch youtube transcript
    const transcripts = await YoutubeTranscript.fetchTranscript(lesson.youtubeUrl, {
      lang: YOUTUBE_TRANSCRIPT_LANGUAGES[lesson.language],
    });

    // Calc duration video and full subtitles
    const fullSubtitles = transcripts.reduce((accumulator, current) => accumulator + `. ${current.text}`, '');

    // Update lessson and subtitle
    await Promise.all([
      this.lessonService.classify(lessonId, fullSubtitles, lesson.language),
      this.subtitleRepository.updateByTranscripts(lessonId, transcripts),
    ]);

    // Return result
    return new InsertResult(1);
  }
}
