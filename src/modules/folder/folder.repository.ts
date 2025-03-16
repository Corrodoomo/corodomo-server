import { Folder, User } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CreateFolderDto } from '@common/dtos';

@Injectable()
export class FolderRepository extends Repository<Folder> {
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
