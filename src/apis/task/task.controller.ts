import { Policy } from '@modules/policy/policy.decorator';
import { Body, Controller, Req } from '@nestjs/common';

import { ApiPost } from '@common/decorators';
import { ApiOkInsertResultExample } from '@common/decorators/example.decorator';
import { CreateTaskDto } from '@common/dtos/task.dto';
import { TaskRecordMapper } from '@common/mappers';
import { Request } from '@common/models';

import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiPost('/')
  @Policy('create', 'tasks')
  @ApiOkInsertResultExample(TaskRecordMapper)
  create(@Body() body: CreateTaskDto, @Req() request: Request) {
    return this.taskService.create(request.user.id, body);
  }
}
