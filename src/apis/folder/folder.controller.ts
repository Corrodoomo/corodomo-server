import { Folder } from '@modules/database/entities';
import { Policy } from '@modules/policy/policy.decorator';
import { Body, Controller, Param, Query, Req } from '@nestjs/common';

import { ApiDelete, ApiGet, ApiPost, ApiPut } from '@common/decorators';
import {
  ApiOkDeleteResultExample,
  ApiOkInsertResultExample,
  ApiOkItemsExample,
  ApiOkPaginationRawExample,
  ApiOkUpdateResultExample,
} from '@common/decorators/example.decorator';
import { CreateFolderDto, FolderRecordDto, MyFolderDto } from '@common/dtos';
import { PaginateQueryDto } from '@common/dtos/common.dto';
import { IdDto } from '@common/dtos/id.dto';
import { Request } from '@common/models';

import { FolderService } from './folder.service';

@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @ApiGet('/')
  @Policy('read', 'folders')
  @ApiOkPaginationRawExample(MyFolderDto)
  get(@Query() query: PaginateQueryDto, @Req() req: Request) {
    return this.folderService.get(query, req.user.id);
  }

  @ApiGet('/list_lessons')
  @Policy('read', 'folders')
  @ApiOkItemsExample(Folder)
  getLessonInFolder(@Req() req: Request) {
    return this.folderService.getLessonInFolder(req.user.id);
  }

  @ApiPost('/')
  @Policy('create', 'folders')
  @ApiOkInsertResultExample(FolderRecordDto)
  create(@Body() body: CreateFolderDto, @Req() req: Request) {
    return this.folderService.create(req.user.id, body);
  }

  @ApiPut('/:id')
  @Policy('update', 'folders')
  @ApiOkUpdateResultExample(FolderRecordDto)
  update(@Param() params: IdDto, @Body() body: CreateFolderDto) {
    return this.folderService.update(params.id, body);
  }

  @ApiDelete('/:id')
  @Policy('delete', 'folders')
  @ApiOkDeleteResultExample()
  delete(@Param() params: IdDto, @Req() req: Request) {
    return this.folderService.delete(params.id, req.user.id);
  }
}
