import { Injectable } from '@nestjs/common';

import { CreateFolderDto, InsertResultDto } from '@common/dtos';

import { FolderRepository } from './folder.repository';

@Injectable()
export class FolderService {
  constructor(private readonly folderRepository: FolderRepository) {}

  /**
   * Create folder
   * @param userId
   * @param folder
   * @returns
   */
  public async create(userId: string, folder: CreateFolderDto) {
    // Insert folder to db
    const createdFolder = await this.folderRepository.createByUser(userId, folder);

    return new InsertResultDto(createdFolder, 1);
  }
}
