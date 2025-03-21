import { Folder } from '@modules/database/entities';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';

import { CreateFolderDto, DeleteResultDto, InsertResultDto, UpdateResultDto } from '@common/dtos';
import { ItemsDto } from '@common/dtos/common.dto';
import { Messages } from '@common/enums';

import { FolderRepository } from './folder.repository';

@Injectable()
export class FolderService {
  constructor(private readonly folderRepository: FolderRepository) {}

  /**
   * Get folder
   * @param userId
   * @param folder
   * @returns
   */
  public async get(userId: string): Promise<ItemsDto<Folder>> {
    // Get list of folder for users
    const items = await this.folderRepository.find({ where: { createdBy: { id: userId } }, cache: true });

    // Return items
    return new ItemsDto(items);
  }

  /**
   * Create folder
   * @param userId
   * @param folder
   * @returns
   */
  public async create(userId: string, folder: CreateFolderDto) {
    // Insert folder to db
    const createdFolder = await this.folderRepository.createByUser(userId, folder);

    // Return results
    return new InsertResultDto(createdFolder, 1);
  }

  /**
   * Update folder name by folder id
   * @param folderId
   * @returns
   */
  public async update(folderId: string, folder: CreateFolderDto, userId: string) {
    console.log('folderIdfolderId', folderId, folder, userId);
    // Find folder of user
    const myFolder = await this.folderRepository.findOne({
      where: { id: folderId, createdBy: { id: userId } },
      cache: true,
    });

    // If empty, invalid permisison
    if (isEmpty(myFolder)) {
      throw new ForbiddenException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Update a folder
    await this.folderRepository.update({ id: folderId }, { name: folder.name });

    // Return result
    return new UpdateResultDto(1);
  }

  /**
   * Delete a folder
   * @param folderId
   * @returns
   */
  public async delete(folderId: string, userId: string) {
    // Find folder of user
    const myFolder = await this.folderRepository.findOne({
      where: { id: folderId, createdBy: { id: userId } },
      cache: true,
    });

    // If empty, invalid permisison
    if (isEmpty(myFolder)) {
      throw new ForbiddenException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Delete a folder
    await this.folderRepository.delete(folderId);

    // Return result
    return new DeleteResultDto(1);
  }
}
