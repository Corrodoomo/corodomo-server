import { Folder } from '@modules/database/entities';
import { Body, Controller, Param, Query, Req } from '@nestjs/common';

import { ApiDelete, ApiGet, ApiPost, ApiPut, RolesOld } from '@common/decorators';
import {
  ApiOkDeleteResultExample,
  ApiOkInsertResultExample,
  ApiOkItemsExample,
  ApiOkPaginationRawExample,
  ApiOkUpdateResultExample,
} from '@common/decorators/example.decorator';
import { CreateFolderDto, FolderIdDto, FolderRecordDto, MyFolderDto } from '@common/dtos';
import { PaginateQueryDto } from '@common/dtos/common.dto';
import { SystemRoles } from '@common/enums';
import { Request } from '@common/models';

import { FolderService } from './folder.service';

@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @ApiGet('/')
  @RolesOld([SystemRoles.LEARNER])
  @ApiOkPaginationRawExample(MyFolderDto)
  get(@Query() query: PaginateQueryDto) {
    return this.folderService.get(query);
  }

  @ApiGet('/list_lessons')
  @RolesOld([SystemRoles.LEARNER])
  @ApiOkItemsExample(Folder)
  getLessonInFolder(@Req() req: Request) {
    return this.folderService.getLessonInFolder(req.user.id);
  }

  @ApiPost('/')
  @RolesOld([SystemRoles.LEARNER])
  @ApiOkInsertResultExample(FolderRecordDto)
  create(@Body() body: CreateFolderDto, @Req() req: Request) {
    return this.folderService.create(req.user.id, body);
  }

  @ApiPut('/:folderId')
  @RolesOld([SystemRoles.LEARNER])
  @ApiOkUpdateResultExample(FolderRecordDto)
  update(@Req() req: Request, @Param() params: FolderIdDto, @Body() body: CreateFolderDto) {
    return this.folderService.update(params.folderId, body, req.user.id);
  }

  @ApiDelete('/:folderId')
  @RolesOld([SystemRoles.LEARNER])
  @ApiOkDeleteResultExample()
  delete(@Param() params: FolderIdDto, @Req() req: Request) {
    return this.folderService.delete(params.folderId, req.user.id);
  }
}
