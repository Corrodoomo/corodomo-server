import { Blog } from '@modules/database/entities';
import { Policy } from '@modules/policy/policy.decorator';
import { Controller, Query } from '@nestjs/common';

import { ApiGet } from '@common/decorators';
import { ApiOkItemExample } from '@common/decorators/example.decorator';
import { PaginateQueryDto } from '@common/dtos/common.dto';

import { ExamService } from './exam.service';

@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @ApiGet('/search')
  @Policy('read', 'blogs')
  @ApiOkItemExample(Blog)
  search(@Query() query: PaginateQueryDto) {
    return this.examService.search(query);
  }
}
