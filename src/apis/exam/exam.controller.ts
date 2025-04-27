import { Blog } from '@modules/database/entities';
import { Policy } from '@modules/policy/policy.decorator';
import { Controller, Param, Query } from '@nestjs/common';

import { ApiGet, ApiPut } from '@common/decorators';
import { ApiOkItemExample } from '@common/decorators/example.decorator';
import { PaginateQueryDto } from '@common/dtos/common.dto';
import { IdDto } from '@common/dtos/id.dto';

import { ExamService } from './exam.service';

@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @ApiGet('/search')
  @Policy('read', 'exams')
  @ApiOkItemExample(Blog)
  search(@Query() query: PaginateQueryDto) {
    return this.examService.search(query);
  }

  @ApiGet('/:id')
  @Policy('read', 'exams')
  @ApiOkItemExample(Blog)
  getDetail(@Param() param: IdDto) {
    return this.examService.getDetail(param.id);
  }

  @ApiPut('/:id/join')
  @Policy('read', 'exams')
  @ApiOkItemExample(Blog)
  join(@Param() param: IdDto) {
    return this.examService.join(param.id);
  }
}
