import { ApiProperty } from '@nestjs/swagger';
import { Column, SortBy } from 'nestjs-paginate/lib/helper';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';

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

export class MetaMapper<T> {
  @ApiProperty({
    description: 'Items per page',
    example: 10,
  })
  itemsPerPage: number;

  @ApiProperty({
    description: 'Total items available',
    example: 100,
    required: false,
  })
  totalItems?: number;

  @ApiProperty({
    description: 'The current page number',
    example: 1,
    required: false,
  })
  currentPage?: number;

  @ApiProperty({
    description: 'Total number of pages available',
    example: 10,
    required: false,
  })
  totalPages?: number;

  @ApiProperty({
    description: 'Sorting configuration for the data',
    type: Object, // Hoặc có thể chỉ định đúng kiểu dữ liệu SortBy
  })
  sortBy: SortBy<T>;

  @ApiProperty({
    description: 'Columns used for search',
    type: [Object], // Hoặc có thể định nghĩa kiểu cho Column<T> nếu có
  })
  searchBy: Column<T>[];

  @ApiProperty({
    description: 'Search query string',
    example: 'keyword',
  })
  search: string;

  @ApiProperty({
    description: 'The list of selected columns to retrieve',
    type: [String],
    example: ['name', 'age'],
  })
  select: string[];

  @ApiProperty({
    description: 'Filters applied to the data',
    type: Object,
    required: false,
  })
  filter?: {
    [column: string]: string | string[];
  };

  @ApiProperty({
    description: 'Cursor for pagination (used in cursor-based pagination)',
    required: false,
  })
  cursor?: string;

  @ApiProperty({
    description: 'The first cursor of the pagination',
    required: false,
  })
  firstCursor?: string;

  @ApiProperty({
    description: 'The last cursor of the pagination',
    required: false,
  })
  lastCursor?: string;
}

export class LinksMapper {
  @ApiProperty({
    description: 'Link to the first page',
    required: false,
  })
  first?: string;

  @ApiProperty({
    description: 'Link to the previous page',
    required: false,
  })
  previous?: string;

  @ApiProperty({
    description: 'Link to the current page',
    required: true,
  })
  current: string;

  @ApiProperty({
    description: 'Link to the next page',
    required: false,
  })
  next?: string;

  @ApiProperty({
    description: 'Link to the last page',
    required: false,
  })
  last?: string;
}

export class PaginatedMapper<TData, TMeta = TData> {
  @ApiProperty({
    description: 'The list of data items',
    type: [Object], // Đảm bảo type chính xác của T nếu có thể
    example: [{}], // Ví dụ mẫu dữ liệu cho T
  })
  data: TData[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: Object,
  })
  meta: MetaMapper<TMeta>;

  @ApiProperty({
    description: 'Pagination links for navigation',
    type: Object,
  })
  links: LinksMapper;

  constructor(data: TData[], meta: MetaMapper<TMeta>, links: LinksMapper) {
    this.data = data;
    this.meta = meta;
    this.links = links;
  }
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

export class ItemsMapper<T> {
  @ApiProperty({
    description: 'The list of data items',
    type: [Object], // Đảm bảo type chính xác của T nếu có thể
    example: [{}], // Ví dụ mẫu dữ liệu cho T
  })
  data: T[];

  constructor(items: T[]) {
    this.data = items;
  }
}

export class ItemMapper<T> {
  @ApiProperty({
    description: 'The list of data items',
    type: [Object], // Đảm bảo type chính xác của T nếu có thể
    example: '{ id: "123" }', // Ví dụ mẫu dữ liệu cho T
  })
  data: T;

  constructor(item: T) {
    this.data = item;
  }
}

export class UpdateRawResultMapper<T> {
  /**
   * Contains inserted entity id.
   * Has entity-like structure (not just column database name and values).
   */
  @ApiProperty({ example: 1 })
  updated: number;

  /**
   * Contains inserted entity id.
   * Has entity-like structure (not just column database name and values).
   */
  @ApiProperty({ example: { id: '15b3e50e-1f94-4762-962d-ff3168bcc745' } })
  raw: T;

  constructor(raw: T, updated: number = 1) {
    this.updated = updated;
    this.raw = raw;
  }
}