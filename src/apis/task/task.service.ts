import { Injectable } from '@nestjs/common';

import { InsertResultDto } from '@common/dtos';
import { CreateTaskDto } from '@common/dtos/task.dto';

import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async create(userId: string, body: CreateTaskDto) {
    const { groupTaskId, assignees, tags, ...createdTask } = body;

    const task = await this.taskRepository.save({
      ...createdTask,
      tags: tags.join(','),
      assignees: assignees.join(','),
      groupTask: { id: groupTaskId },
      createdBy: { id: userId },
    });

    return new InsertResultDto(task, 1);
  }
}
