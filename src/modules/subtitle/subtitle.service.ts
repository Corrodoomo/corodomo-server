import { LessonRepository } from '@modules/lesson/lesson.repository';
import { LessonService } from '@modules/lesson/lesson.service';
import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { YoutubeTranscript } from 'youtube-transcript';

import { LIMIT_DURATION_VIDEO } from '@common/constants';
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
    const lesson = await this.lessonRepository.getRawOne(lessonId, [
      'id',
      'tag',
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
    const transcripts = await YoutubeTranscript.fetchTranscript(lesson.youtubeUrl);

    // Calc duration video and full subtitles
    const { duration, fullSubtitles } = transcripts.reduce(
      (accumulator, current) => {
        accumulator.duration += current.duration; // Sum duration
        accumulator.fullSubtitles += `. ${current.text}`; // Add fullSubtitles
        return accumulator;
      },
      { duration: 0, fullSubtitles: '' }
    );

    if (duration > LIMIT_DURATION_VIDEO) {
      throw new BadRequestException(Messages.LIMIT_DURATION_VIDEO);
    }

    // Update lessson and subtitle
    await Promise.all([
      this.lessonService.classify(lessonId, fullSubtitles, duration),
      this.subtitleRepository.updateByTranscripts(lessonId, transcripts),
    ]);

    // Return result
    return new InsertResult(1);
  }
}
