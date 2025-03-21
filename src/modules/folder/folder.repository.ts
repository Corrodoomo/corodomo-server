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
}
