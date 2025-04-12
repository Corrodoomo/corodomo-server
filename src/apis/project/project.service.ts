import { ProjectRaw } from '@modules/database/entities';
import { ProjectRecentRepository } from '@modules/project-recent/project-recent.repository';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { FilterOperator, FilterSuffix, paginate } from 'nestjs-paginate';
import { Brackets } from 'typeorm';

import { DeleteResultDto, InsertResultDto, UpdateResultDto } from '@common/dtos';
import { PaginateQueryDto } from '@common/dtos/common.dto';
import { CreateProjectDto, UpdateProjectDto } from '@common/dtos/project.dto';
import { Messages } from '@common/enums';
import { ProjectRecentsMapper } from '@common/mappers/project.mapper';

import { WorkspaceRepository } from '../workspace/workspace.repository';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly projectRecentRepository: ProjectRecentRepository,
    private readonly workspaceRepository: WorkspaceRepository
  ) {}

  /**
   * Get my project recents
   * @param userId
   * @returns
   */
  public async getPagination(query: PaginateQueryDto, userId: string) {
    return paginate(
      query,
      this.projectRepository.createQueryBuilder('project').andWhere(
        new Brackets((qb) => {
          qb.where('project.created_by = :userId', { userId }).orWhere(
            ':member::text = ANY(string_to_array(project.members, :comma))',
            {
              member: userId,
              comma: ',',
            }
          );
        })
      ),
      {
        select: [
          'id',
          'name',
          'description',
          'startAt',
          'endAt',
          'members',
          'theme',
          'workspace.id',
          'workspace.title',
          'recents.id',
          'recents.accessedAt',
          'createdBy.id',
          'createdBy.name',
          'createdBy.avatarUrl',
        ],
        sortableColumns: ['name', 'recents.accessedAt'],
        filterableColumns: {
          'workspace.id': [FilterOperator.EQ],
          'recents.accessedAt': [FilterOperator.NULL, FilterSuffix.NOT],
        },
        relations: ['recents', 'createdBy', 'workspace'],
      }
    );
  }

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
      createdBy: {
        id: userId,
      },
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
    const { workspaceId, ...sentBody } = body;
    // Get workspace by id
    const project = (await this.projectRepository.getRawOne(projectId, [
      'id',
      'created_by as "createdBy"',
    ])) as ProjectRaw;

    // Check if workspace is empty
    if (isEmpty(project)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Check if project is owned by user
    if (project.createdBy !== userId) {
      throw new ForbiddenException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Create project
    const { affected } = await this.projectRepository.updateById(projectId, {
      ...sentBody,
      workspace: {
        id: workspaceId,
      },
    });

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
    const project = await this.projectRepository.getRawOne(projectId, ['id', 'created_by as "createdBy"']);

    // Check if workspace is empty
    if (isEmpty(project)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Check if project is owned by user
    if (project.createdBy !== userId) {
      throw new ForbiddenException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Create project
    const { affected } = await this.projectRepository.delete(projectId);

    // Return insert result
    return new DeleteResultDto(affected);
  }
}
