import { BadRequestException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { paginateRaw } from 'nestjs-typeorm-paginate';

import { DeleteResultDto, InsertResultDto, UpdateResultDto } from '@common/dtos';
import { PaginateQueryDto } from '@common/dtos/common.dto';
import { CreateWorkspaceDto } from '@common/dtos/workspace.dto';
import { Messages } from '@common/enums';
import { PaginateRawMapper } from '@common/mappers';

import { ProjectRepository } from '../project/project.repository';
import { WorkspaceRepository } from './workspace.repository';

@Injectable()
export class WorkspaceService {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly projectRepository: ProjectRepository
  ) {}

  /**
   * Get my workspaces
   * @param userId
   * @returns
   */
  public async getMyWorkspaces(query: PaginateQueryDto, userId: string) {
    // Query all workspace where user is a member or user is the owner
    const queryBuilder = this.workspaceRepository.queryMyWorkspaces(userId);

    const raw = await paginateRaw(queryBuilder, { page: query.page, limit: query.limit });

    // Return result
    return new PaginateRawMapper(raw);
  }

  /**
   * Create a workspace
   * @param userId
   * @param body
   * @returns
   */
  public async create(userId: string, body: CreateWorkspaceDto) {
    // Destructing body
    const { theme, title } = body;

    // Save workspace
    const savedWorkspace = await this.workspaceRepository.save({
      title,
      theme,
      createdBy: { id: userId },
    });

    // Return result
    return new InsertResultDto(savedWorkspace);
  }

  /**
   * Update a workspace
   * @param userId
   * @param body
   * @returns
   */
  public async update(userId: string, workspaceId: string, body: CreateWorkspaceDto) {
    // Get workspace of user
    const workspace = await this.workspaceRepository.getRawOne(workspaceId, ['id', 'created_by as "createdBy"']);

    // Check if workspace not created from user
    if (isEmpty(workspace)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Check if workspace not created from user
    if (workspace.createdBy !== userId) {
      throw new BadRequestException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Save workspace
    const { affected } = await this.workspaceRepository.updateById(workspaceId, body);

    // Return result
    return new UpdateResultDto(affected);
  }

  /**
   * Update a workspace
   * @param userId
   * @param body
   * @returns
   */
  public async delete(userId: string, workspaceId: string) {
    // Get workspace of user
    const workspace = await this.workspaceRepository.getRawOne(workspaceId, ['id', 'created_by as "createdBy"']);

    // Check if workspace not created from user
    if (isEmpty(workspace)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Check if workspace not created from user
    if (workspace.createdBy !== userId) {
      throw new BadRequestException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Delete project
    await this.projectRepository.delete({
      workspace: {
        id: workspaceId,
      },
    });

    // Delete workspace
    const { affected } = await this.workspaceRepository.delete(workspaceId);

    // Return result
    return new DeleteResultDto(affected);
  }
}
