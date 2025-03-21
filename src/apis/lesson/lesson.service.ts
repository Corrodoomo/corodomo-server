import { LessonEsService } from '@modules/elastic-search/services/lesson-es.service';
import { MinimapEsService } from '@modules/elastic-search/services/minimap-es.service';
import { OpenAIService } from '@modules/openai/openai.service';
import { YoutubeService } from '@modules/youtube/youtube.service';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { FilterOperator, paginate, PaginateQuery } from 'nestjs-paginate';

import { LIMIT_DURATION_VIDEO } from '@common/constants';
import {
  CreateLessonDto,
  DeleteResultDto,
  InsertResultDto,
  ListTagsDto,
  UpdateNoteDto,
  UpdateRawResultDto,
  UpdateResultDto,
} from '@common/dtos';
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
    private readonly youtubeService: YoutubeService
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

    // Duration limit
    if (duration > LIMIT_DURATION_VIDEO) {
      throw new BadRequestException(Messages.LIMIT_DURATION_VIDEO);
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
    const lesson = await this.lessonRepository.getRawOne(lessonId);

    // Error if lesson not found
    if (isEmpty(lesson)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Error if permission invalid
    if (lesson.createdBy !== userId) {
      throw new ForbiddenException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Delete casade. It will delete all records have a FK lesson_id
    await this.lessonRepository.delete(lessonId);

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
        'note',
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
  public async watch(lessonId: string): Promise<UpdateResultDto> {
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
  public async classify(lessonId: string, fullSubtitles: string) {
    // Tag and level generated
    const level = await this.openaiService.level(fullSubtitles);

    // Update lesson
    return this.lessonRepository.update({ id: lessonId }, { fullSubtitles, level });
  }

  /**
   * Create a note lesson
   * @param lessonId
   * @param userId
   * @param body
   * @returns
   */
  public async note(lessonId: string, userId: string, body: UpdateNoteDto) {
    // Check lesson
    const lesson = await this.lessonRepository.getRawOne(lessonId, ['id', 'created_by as "createdBy"']);

    // Check if lesson not found
    if (isEmpty(lesson)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Check if no permission
    if (lesson.createdBy !== userId) {
      throw new ForbiddenException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Update note
    await this.lessonRepository.update({ id: lessonId }, { note: body.content });

    lesson.note = body.content;

    // Return result
    return new UpdateRawResultDto(lesson, 1);
  }

  /**
   * Get detail for learn
   * @param lessonId
   * @returns
   */
  public async getDetail(lessonId: string) {
    // Get lesson by id
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
      select: ['id', 'tag', 'duration', 'language', 'level', 'note', 'watchedCount'],
      relations: ['notedVocabularies', 'comments', 'subtitles'],
    });

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
