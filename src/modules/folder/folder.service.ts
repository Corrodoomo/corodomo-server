import { User } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';

import { CreateFolderDto, InsertResultWithId } from '@common/dtos';

import { FolderRepository } from './folder.repository';

@Injectable()
export class FolderService {
  constructor(private readonly folderRepository: FolderRepository) {}

  public async create(userId: string, folder: CreateFolderDto) {
    const createdBy = new User();
    createdBy.id = userId;

    const createdFolder = await this.folderRepository.save({
      ...folder,
      createdBy,
    });

    return new InsertResultWithId(createdFolder.id, 1);
  }
}
