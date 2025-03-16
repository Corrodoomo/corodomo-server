import { OpenAIService } from '@modules/openai/openai.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { isNil } from 'lodash';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { TranscriptResponse } from 'youtube-transcript';

import { YOUTUBE_THUMBNAIL_PREFIX } from '@common/constants';
import { CreateLessonDto, InsertResultDto, InsertResultWithId, UpdateResultDto } from '@common/dtos';

import { LessonRepository } from './lesson.repository';

@Injectable()
export class LessonService {
  constructor(
    private readonly lessonRepository: LessonRepository,
    private readonly openaiService: OpenAIService
  ) {}

  /**
   * Create lesson
   * @param lesson
   * @returns
   */
  public async create(userId: string, lesson: CreateLessonDto): Promise<InsertResultWithId> {
    const youtubeId = new URLSearchParams(new URL(lesson.youtubeUrl).search).get('v');

    // Check if youtube not null or undefined
    if (isNil(youtubeId)) {
      throw new BadRequestException();
    }

    // Create lesson
    const createdLesson = await this.lessonRepository.save({
      ...lesson,
      folder: {
        id: lesson.folderId,
      },
      createdBy: {
        id: userId,
      },
      thumbnail: YOUTUBE_THUMBNAIL_PREFIX.replace('{videoId}', youtubeId),
    });

    // Return result
    return new InsertResultDto(createdLesson, 1);
  }

  /**
   * Get lesson pagination
   * @param query
   * @returns
   */
  public async get(query: PaginateQuery) {
    return paginate(query, this.lessonRepository, {
      sortableColumns: ['tag'],
      select: ['id', 'tag', 'language', 'duration', 'watchedCount', 'createdAt', 'youtubeUrl'],
    });
  }

  /**
   * Watch lesson
   * @param query
   * @returns
   */
  public async watch(lessonId: string): Promise<UpdateResultDto> {
    await this.lessonRepository.updateWatchedCount(lessonId);

    return new UpdateResultDto(1);
  }

  /**
   * Classify tag and level of a lesson
   * @param lessonId
   * @param transcripts
   * @returns
   */
  public async classify(lessonId: string, transcripts: TranscriptResponse[]) {
    // Calc duration video and full subtitles
    const { duration, fullSubtitles } = transcripts.reduce(
      (accumulator, current) => {
        accumulator.duration += current.duration; // Sum duration
        accumulator.fullSubtitles += `. ${current.text}`; // Add fullSubtitles
        return accumulator;
      },
      { duration: 0, fullSubtitles: '' }
    );

    // Tag and level generated
    const [tag, level] = await Promise.all([
      this.openaiService.tag(fullSubtitles),
      this.openaiService.level(fullSubtitles),
    ]);

    // Update lesson
    return this.lessonRepository.update({ id: lessonId }, { duration, fullSubtitles, tag, level });
  }
}
