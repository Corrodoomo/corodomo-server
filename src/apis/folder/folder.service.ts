import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { paginateRaw } from 'nestjs-typeorm-paginate';

import { CreateFolderDto, DeleteResultDto, InsertResultDto, UpdateResultDto } from '@common/dtos';
import { PaginateQueryDto } from '@common/dtos/common.dto';
import { Messages } from '@common/enums';
import { ItemsMapper, PaginateRawMapper } from '@common/mappers';

import { FolderRepository } from './folder.repository';

@Injectable()
export class FolderService {
  constructor(private readonly folderRepository: FolderRepository) {}

  /**
   * Paginate folder
   * @param userId
   * @param folder
   * @returns
   */
  public async get(query: PaginateQueryDto, userId: string) {
    // Query builder
    const qb = this.folderRepository.queryPaginatedFolder(userId);

    // Paginate list of folders
    const raw = await paginateRaw(qb, { page: query.page, limit: query.limit });

    // Return result
    return new PaginateRawMapper(raw);
  }

  /**
   * Get lesson in folder
   * @param userId
   * @param folder
   * @returns
   */
  public async getLessonInFolder(userId: string) {
    // Get list of folder for users
    const items = await this.folderRepository.queryLessonInFolder(userId);

    // Return items
    return new ItemsMapper(items);
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
    // Find folder of user
    const myFolder = await this.folderRepository.getRawOne(folderId, ['id', 'created_by as "createdBy"']);

    // If empty, invalid permisison
    if (isEmpty(myFolder)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // If empty, invalid permisison
    if (myFolder.createdBy !== userId) {
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
    const myFolder = await this.folderRepository.getRawOne(folderId, ['id', 'created_by as "createdBy"']);

    // If empty, invalid permisison
    if (isEmpty(myFolder)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // If empty, invalid permisison
    if (myFolder.createdBy !== userId) {
      throw new ForbiddenException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Delete a folder
    await this.folderRepository.delete(folderId);

    // Return result
    return new DeleteResultDto(1);
  }
}
