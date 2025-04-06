import { ProjectRaw } from '@modules/database/entities';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';

import { DeleteResultDto, InsertResultDto, UpdateResultDto } from '@common/dtos';
import { CreateProjectDto, UpdateProjectDto } from '@common/dtos/project.dto';
import { Messages } from '@common/enums';
import { ProjectRecentsMapper } from '@common/mappers/project.mapper';

import { UsersRepository } from '../user/user.repository';
import { WorkspaceRepository } from '../workspace/workspace.repository';
import { ProjectRepository } from './project.repository';
import { ProjectRecentRepository } from '@modules/project-recent/project-recent.repository';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly projectRecentRepository: ProjectRecentRepository,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly userRepository: UsersRepository
  ) {}

  /**
   * Get my project recents
   * @param userId
   * @returns
   */
  public async getMyProjectRecents(userId: string) {
    // Get project recents
    const recents = await this.projectRepository.queryMyProjectRecents(userId);

    // Return result
    return new ProjectRecentsMapper(recents);
  }

  /**
   * Create a project
   * @param userId
   * @param body
   * @returns
   */
  public async create(userId: string, body: CreateProjectDto) {
    // Destrucuting body
    const { workspaceId, ...createdProject } = body;

    // Get workspace by id
    const workspace = await this.workspaceRepository.queryWorkspaceExisted(workspaceId);

    // Check if workspace is empty
    if (isEmpty(workspace)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Check if workspace is owned by user
    if (workspace.createdBy !== userId) {
      throw new ForbiddenException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Create project
    const savedProject = await this.projectRepository.save({
      ...createdProject,
      workspace: { id: workspaceId },
    });

    // Return insert result
    return new InsertResultDto(savedProject);
  }

  /**
   * Update a project
   * @param userId
   * @param body
   * @returns
   */
  public async update(userId: string, projectId: string, body: UpdateProjectDto) {
    // Get workspace by id
    const project = (await this.projectRepository.getRawOne(projectId, [
      'id',
      'workspace_id as "workspaceId"',
    ])) as ProjectRaw;

    // Check if workspace is empty
    if (isEmpty(project)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Get workspace by id
    const workspace = await this.workspaceRepository.queryWorkspaceExisted(project.id);

    // Check if workspace is empty
    if (isEmpty(workspace)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Check if workspace is owned by user
    if (workspace.createdBy !== userId) {
      throw new ForbiddenException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Create project
    const { affected } = await this.projectRepository.updateById(projectId, body);

    // Return insert result
    return new UpdateResultDto(affected);
  }

  /**
   * Delete a project
   * @param userId
   * @param body
   * @returns
   */
  public async delete(userId: string, projectId: string) {
    // Get workspace by id
    const project = await this.projectRepository.getRawOne(projectId, ['id', 'workspace_id as "workspace"']);

    // Check if workspace is empty
    if (isEmpty(project)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Get workspace by id
    const workspace = await this.workspaceRepository.queryWorkspaceExisted(String(project?.workspace));

    // Check if workspace is empty
    if (isEmpty(workspace)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Check if workspace is owned by user
    if (workspace.createdBy !== userId) {
      throw new ForbiddenException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Create project
    const { affected } = await this.projectRepository.delete(projectId);

    // Return insert result
    return new DeleteResultDto(affected);
  }
}
