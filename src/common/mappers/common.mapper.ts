import { ApiProperty } from '@nestjs/swagger';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';

import { LinksDto, MetaDto } from '@common/dtos/common.dto';

export class BaseRecordMapper {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class IdMapper {
  @ApiProperty()
  id: string;
}

export class BelongToGroupAndUserMapper {
  @ApiProperty()
  groupTask: IdMapper;

  @ApiProperty()
  createdBy: IdMapper;
}

export class BelongToUserMapper extends BaseRecordMapper {
  @ApiProperty()
  createdBy: IdMapper;
}

export class RawMeta {
  @ApiProperty()
  totalItems?: number;

  @ApiProperty()
  itemCount: number;

  @ApiProperty()
  itemsPerPage: number;

  @ApiProperty()
  totalPages?: number;

  @ApiProperty()
  currentPage: number;
}

export class PaginateRawMapper<T> {
  @ApiProperty({
    description: 'The list of data items',
    type: [Object],
    example: [{}],
  })
  data: T[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: Object,
  })
  meta: RawMeta;

  constructor(raw: Pagination<T, IPaginationMeta>) {
    this.data = raw.items;
    this.meta = {
      currentPage: raw.meta.currentPage,
      itemsPerPage: raw.meta.itemsPerPage,
      totalItems: raw.meta.totalItems,
      totalPages: raw.meta.totalPages,
      itemCount: raw.meta.itemCount,
    };
  }
}
