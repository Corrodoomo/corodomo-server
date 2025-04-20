import { Blog } from '@modules/database/entities';
import { Policy } from '@modules/policy/policy.decorator';
import { Body, Controller, Param, Req } from '@nestjs/common';

import { ApiDelete, ApiGet, ApiPost, ApiPut } from '@common/decorators';
import {
  ApiOkDeleteResultExample,
  ApiOkInsertResultExample,
  ApiOkItemExample,
  ApiOkItemsExample,
  ApiOkUpdateResultExample,
} from '@common/decorators/example.decorator';
import { CreateBlogDto, UpdateBlogDto } from '@common/dtos/blog.dto';
import { BlogIdDto } from '@common/dtos/id.dto';
import { Request } from '@common/models';

import { BlogService } from './blog.service';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @ApiGet('/:blogId')
  @Policy('read', 'blogs')
  @ApiOkItemExample(Blog)
  getDetail(@Param() param: BlogIdDto, @Req() request: Request) {
    return this.blogService.getDetail(request.user.id, param.blogId);
  }

  @ApiGet('/my_lists')
  @Policy('read', 'blogs')
  @ApiOkItemsExample(Blog)
  getMyBlogs(@Req() request: Request) {
    return this.blogService.getMyBlogs(request.user.id);
  }

  @ApiPost('/')
  @Policy('create', 'blogs')
  @ApiOkInsertResultExample(Blog)
  create(@Body() body: CreateBlogDto, @Req() request: Request) {
    return this.blogService.create(request.user.id, body);
  }

  @ApiPut('/:blogId')
  @Policy('update', 'blogs')
  @ApiOkUpdateResultExample(Blog)
  update(@Param() param: BlogIdDto, @Body() body: UpdateBlogDto, @Req() request: Request) {
    return this.blogService.update(request.user.id, param.blogId, body);
  }

  @ApiDelete('/:blogId')
  @Policy('delete', 'blogs')
  @ApiOkDeleteResultExample()
  delete(@Param() param: BlogIdDto, @Req() request: Request) {
    return this.blogService.delete(request.user.id, param.blogId);
  }
}
