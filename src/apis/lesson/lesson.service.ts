import { LessonRecent } from '@modules/database/entities/lesson-recent.entity';
import { LessonEsService } from '@modules/elastic-search/services/lesson-es.service';
import { MinimapEsService } from '@modules/elastic-search/services/minimap-es.service';
import { LessonRecentRepository } from '@modules/lesson-recent/lesson-recent.repository';
import { OpenAIService } from '@modules/openai/openai.service';
import { YoutubeService } from '@modules/youtube/youtube.service';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { FilterOperator, paginate, PaginateQuery } from 'nestjs-paginate';

import { LIMIT_DURATION_VIDEO, YOUTUBE_TRANSCRIPT_LANGUAGES } from '@common/constants';
import { CreateLessonDto, DeleteResultDto, InsertResultDto, ListTagsDto, UpdateResultDto } from '@common/dtos';
import { ItemDto } from '@common/dtos/common.dto';
import { Messages } from '@common/enums';

import { LessonRepository } from './lesson.repository';

@Injectable()
export class LessonService {
  constructor(
    private readonly lessonRepository: LessonRepository,
    private readonly lessonEsService: LessonEsService,
    private readonly minimapEsService: MinimapEsService,
    private readonly openaiService: OpenAIService,
    private readonly youtubeService: YoutubeService,
    private readonly lessonRecentRepository: LessonRecentRepository
  ) {}

  /**
   * Create lesson
   * @param lesson
   * @returns
   */
  public async create(userId: string, lesson: CreateLessonDto) {
    // Get metadata youtube
    const metadata = await this.youtubeService.getMetadata(lesson.youtubeUrl);
    const duration = Number(metadata.videoDetails.lengthSeconds);

    // Caption tracks by langs
    const captionTracks = metadata.player_response.captions?.playerCaptionsTracklistRenderer?.captionTracks;

    // Error if subtitles not found
    if (isEmpty(captionTracks)) {
      throw new BadRequestException(Messages.SUBTITLES_NOT_FOUND);
    }

    // Find caption track by lang
    const captionTrackByLang = captionTracks?.find(
      (captionTrack) => captionTrack.languageCode === YOUTUBE_TRANSCRIPT_LANGUAGES[lesson.language]
    );

    // Error if subtitles not founds
    if (isEmpty(captionTrackByLang)) {
      throw new BadRequestException(Messages.LANG_SUBTITLES_NOT_FOUND);
    }

    // Duration limit
    if (duration > LIMIT_DURATION_VIDEO) {
      throw new BadRequestException(Messages.LIMIT_DURATION_VIDEO);
    }

    // Transcript not allowed
    if (isEmpty(metadata.player_response.captions)) {
      throw new BadRequestException(Messages.SUBTITLES_NOT_FOUND);
    }

    // Create lesson
    const createdLesson = await this.lessonRepository.save({
      ...lesson,
      title: metadata.videoDetails.title,
      duration,
      tag: metadata.videoDetails.category,
      thumbnail: metadata.videoDetails.thumbnails[metadata.videoDetails.thumbnails.length - 1].url,
      folder: {
        id: lesson.folderId,
      },
      createdBy: {
        id: userId,
      },
    });

    // Create lesson in Elastic search
    await this.lessonEsService.indexDocument(createdLesson);

    // Return result
    return new InsertResultDto(createdLesson, 1);
  }

  /**
   * Delete lesson by id
   * @param lesson
   * @returns
   */
  public async delete(userId: string, lessonId: string) {
    // Get lesson by id
    const lesson = await this.lessonRepository.getRawOne(lessonId, [
      'id',
      'minimap_id as "minimapId"',
      'created_by as "createdBy"',
    ]);

    // Error if lesson not found
    if (isEmpty(lesson)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Error if permission invalid
    if (lesson.createdBy !== userId) {
      throw new ForbiddenException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Delete process
    await Promise.all([
      // Delete casade. It will delete all records have a FK lesson_id
      await this.lessonRepository.delete(lessonId),
      // Delete all data in elastic search
      await this.lessonEsService.deleteByLessonId('19f66779-7024-4447-bd39-99e6eb571925'),
      await this.minimapEsService.deleteDocument('l3YDpZUBSz-XFdOgJyFD'),
    ]);

    // Return result
    return new DeleteResultDto(1);
  }

  /**
   * Get list of lesson tags
   */
  public async getListTags() {
    // Get tag list
    const tags = await this.lessonRepository.getDistinctTags();

    // Return result
    return new ListTagsDto(tags);
  }

  /**
   * Get lesson pagination
   * @param query
   * @returns
   */
  public async get(query: PaginateQuery) {
    return paginate(query, this.lessonRepository, {
      sortableColumns: ['id', 'tag', 'level', 'title'],
      searchableColumns: ['tag', 'language', 'level', 'title'],
      select: [
        'id',
        'title',
        'level',
        'tag',
        'language',
        'level',
        'watchedAt',
        'watchedCount',
        'youtubeUrl',
        'thumbnail',
        'duration',
      ],
      filterableColumns: {
        language: [FilterOperator.EQ],
        level: [FilterOperator.EQ],
      },
    });
  }

  /**
   * Watch lesson
   * @param query
   * @returns
   */
  public async watch(userId: string, lessonId: string) {
    // Get lesson recent by user id and lesson id
    let lessonRecent = await this.lessonRecentRepository.findOne({
      where: { accessor: { id: userId }, lesson: { id: lessonId } },
    });

    // Init lesson recent if not found
    if (isEmpty(lessonRecent)) {
      lessonRecent = this.lessonRecentRepository.create({
        accessor: { id: userId },
        lesson: { id: lessonId },
      });
    }

    // Update accessed date
    lessonRecent.accessedAt = new Date();

    // Update to database
    await this.lessonRecentRepository.save(lessonRecent);

    // Update watchedAt and watchedCount
    await this.lessonRepository.updateWatchedCount(lessonId);

    // Return result
    return new UpdateResultDto(1);
  }

  /**
   * Classify tag and level of a lesson
   * @param lessonId
   * @param transcripts
   * @returns
   */
  public async classify(lessonId: string, fullSubtitles: string, language: string) {
    // Tag and level generated
    const level = await this.openaiService.level(fullSubtitles, language);

    // Update lesson
    return this.lessonRepository.update({ id: lessonId }, { fullSubtitles, level });
  }

  /**
   * Get detail for learn
   * @param lessonId
   * @returns
   */
  public async getDetail(lessonId: string, userId: string) {
    // Get lesson by id
    const lesson = await this.lessonRepository.getLessonForUser(lessonId, userId);

    // Return result
    return new ItemDto(lesson);
  }

  /**
   * Get minimaps
   * @param lessonId
   * @returns
   */
  public async getMinimaps(lessonId: string) {
    // Get lesson by id
    const lesson = await this.lessonRepository.getById(lessonId, ['id', 'minimapId']);

    // Error if lesson not found
    if (isEmpty(lesson)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Get minimap in elastic search
    const { _id, _source } = await this.minimapEsService.getById(lesson.minimapId);

    // Return result
    return new ItemDto({ id: _id, source: _source });
  }
}
