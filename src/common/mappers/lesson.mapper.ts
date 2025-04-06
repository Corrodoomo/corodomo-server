import { Lesson } from '@modules/database/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Paginated } from 'nestjs-paginate';

import { IdMapper, PaginatedMapper } from './common.mapper';

export class LessonInFolderMapper {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  youtubeUrl: string;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  watchedCount: number;

  @ApiProperty()
  accessedAt?: Date;

  @ApiProperty()
  language: string;

  @ApiProperty()
  folder: IdMapper;
}

export class LessonsInFolderMapper extends PaginatedMapper<LessonInFolderMapper, Lesson> {
  constructor(pagination: Paginated<Lesson>) {
    super(LessonsInFolderMapper.handleMapper(pagination.data), pagination.meta, pagination.links);
  }

  /**
   * Handle mapper
   * @param lesson
   * @returns
   */
  public static handleMapper(lesson: Lesson[]) {
    return lesson.map(({ id, title, youtubeUrl, thumbnail, duration, watchedCount, language, folder, lessonRecents }) => ({
      id,
      title,
      youtubeUrl,
      thumbnail,
      duration,
      watchedCount,
      language,
      folder,
      accessedAt: lessonRecents.pop()?.accessedAt,
    }));
  }
}
