import { Body, Controller, Req } from '@nestjs/common';

import { Post, Roles } from '@common/decorators';
import { CreateFolderDto, InsertResult } from '@common/dtos';
import { SystemRoles } from '@common/enums';
import { Request } from '@common/models';

import { FolderService } from './folder.service';

@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post('/', { model: InsertResult })
  @Roles([SystemRoles.LEARNER])
  create(@Body() body: CreateFolderDto, @Req() req: Request) {
    return this.folderService.create(req.user.id, body);
  }
}
