import { Folder } from '@modules/database/entities';
import { Body, Controller, Param, Req } from '@nestjs/common';

import { Delete, Get, Post, Put, Roles } from '@common/decorators';
import { CreateFolderDto, DeleteResultDto, FolderIdDto, InsertResult, UpdateResultDto } from '@common/dtos';
import { ItemsDto } from '@common/dtos/common.dto';
import { SystemRoles } from '@common/enums';
import { Request } from '@common/models';

import { FolderService } from './folder.service';

@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Get('/', { model: ItemsDto<Folder> })
  @Roles([SystemRoles.LEARNER])
  get(@Req() req: Request) {
    return this.folderService.get(req.user.id);
  }

  @Post('/', { model: InsertResult })
  @Roles([SystemRoles.LEARNER])
  create(@Body() body: CreateFolderDto, @Req() req: Request) {
    return this.folderService.create(req.user.id, body);
  }

  @Put('/:folderId', { model: UpdateResultDto })
  @Roles([SystemRoles.LEARNER])
  update(@Req() req: Request, @Param() params: FolderIdDto, @Body() body: CreateFolderDto) {
    return this.folderService.update(params.folderId, body, req.user.id);
  }

  @Delete('/:folderId', { model: DeleteResultDto })
  @Roles([SystemRoles.LEARNER])
  delete(@Param() params: FolderIdDto, @Req() req: Request) {
    return this.folderService.delete(params.folderId, req.user.id);
  }
}
