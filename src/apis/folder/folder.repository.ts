import { Folder, User } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { CreateFolderDto } from '@common/dtos';
import { BaseRepository } from '@common/repository';

@Injectable()
export class FolderRepository extends BaseRepository<Folder> {
  constructor(private dataSource: DataSource) {
    super(Folder, dataSource.createEntityManager());
  }

  /**
   * Create by user
   * @param userId
   * @param folder
   * @returns
   */
  public createByUser(userId: string, folder: CreateFolderDto) {
    const createdBy = new User();
    createdBy.id = userId;

    return this.save({
      ...folder,
      createdBy,
    });
  }

  /**
   * Query lesson in folder
   * @param userId
   * @param folder
   * @returns
   */
  public async queryLessonInFolder(userId: string) {
    // Get list of folder for users
    return this.createQueryBuilder('folder')
      .leftJoinAndSelect('folder.lessons', 'lesson')
      .where('folder.createdBy = :userId', { userId })
      .select([
        'folder.id',
        'folder.name',
        'lesson.id',
        'lesson.title',
        'lesson.thumbnail',
        'lesson.duration',
        'lesson.watchedAt',
        'lesson.language',
      ])
      .getMany();
  }

  /**
   * Query paginated folder
   * @param userId
   * @param folder
   * @returns
   */
  public queryPaginatedFolder(userId: string) {
    return this.createQueryBuilder('folder')
      .select([
        'folder.id as "id"',
        'folder.name as "name"',
        'folder.updated_at as "updatedAt"',
        'folder.created_at as "createdAt"',
      ])
      .addSelect((subQuery) => {
        return subQuery
          .select('CAST(COUNT(lesson.id) AS INT)', 'amount') // Đếm số bài học
          .from('lessons', 'lesson')
          .where('lesson.folder_id = folder.id');
      }, 'amount')
      .where('created_by = :userId', { userId })
      .orderBy('folder.name', 'ASC');
  }
}
