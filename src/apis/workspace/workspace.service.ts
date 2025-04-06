import { BadRequestException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { In } from 'typeorm';

import { DeleteResultDto, InsertResultDto, UpdateResultDto } from '@common/dtos';
import { CreateWorkspaceDto } from '@common/dtos/workspace.dto';
import { Messages } from '@common/enums';

import { UsersRepository } from '../user/user.repository';
import { WorkspaceRepository } from './workspace.repository';
import { ItemsMapper } from '@common/mappers';

@Injectable()
export class WorkspaceService {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly userRepository: UsersRepository
  ) {}

  /**
   * Get my workspaces
   * @param userId 
   * @returns 
   */
  public async getMyWorkspaces(userId: string) {
    // Query all workspace where user is a member or user is the owner
    const workspaces = await this.workspaceRepository.queryMyWorkspaces(userId);

    // Return the workspaces
    return new ItemsMapper(workspaces);
  }

  /**
   * Create a workspace
   * @param userId
   * @param body
   * @returns
   */
  public async create(userId: string, body: CreateWorkspaceDto) {
    // Destructing body
    const { members, title } = body;

    // Find members includes user table
    const user = await this.userRepository.find({ where: { id: In(members) } });

    // Check if members not exist
    if (user.length !== members.length) {
      throw new BadRequestException(Messages.MEMBERS_NOT_FOUND);
    }

    // Save workspace
    const savedWorkspace = await this.workspaceRepository.save({
      title,
      members: members.join(','),
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

    // Destructing body
    const { members, title } = body;

    // Find members includes user table
    const user = await this.userRepository.find({ where: { id: In(members) } });

    // Check if members not exist
    if (user.length !== members.length) {
      throw new BadRequestException(Messages.MEMBERS_NOT_FOUND);
    }

    // Save workspace
    const { affected } = await this.workspaceRepository.updateById(workspaceId, {
      title,
      members: members.join(','),
      createdBy: { id: userId },
    });

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

    // Delete workspace
    const { affected } = await this.workspaceRepository.delete(workspaceId);

    // Return result
    return new DeleteResultDto(affected);
  }
}
