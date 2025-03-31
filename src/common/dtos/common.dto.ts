import { TransformProperty } from '@common/decorators/transform.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { Column, SortBy } from 'nestjs-paginate/lib/helper';

// DTO cho PaginateQuery
export class PaginateQueryDto {
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  limit?: number = 10;

  @ApiPropertyOptional({ example: 'id:DESC', type: String })
  @IsOptional()
  @IsString({ each: true })
  @TransformProperty(({ value }) => (value ? [value.split(':')] : []))
  sortBy?: [string, string][];

  @ApiPropertyOptional({ example: 'id,tag', type: String })
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (value ? value.split(',') : []), { toClassOnly: true })
  searchBy?: string[];

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsObject()
  filter?: {
    [column: string]: string | string[];
  };

  @ApiPropertyOptional({ example: 'id,tag', type: String })
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (value ? value.split(',') : []), { toClassOnly: true })
  select?: string[];

  @IsOptional()
  @IsString()
  cursor?: string;

  @IsOptional()
  @IsString()
  cursorColumn?: string;

  @IsOptional()
  @IsEnum(['before', 'after'])
  cursorDirection?: 'before' | 'after';

  @IsOptional()
  @IsString()
  path: string = 'paginate_items';
}

export class MetaDto<T> {
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

export class LinksDto {
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

export class PaginatedDto<T> {
  @ApiProperty({
    description: 'The list of data items',
    type: [Object], // Đảm bảo type chính xác của T nếu có thể
    example: [{}], // Ví dụ mẫu dữ liệu cho T
  })
  data: T[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: Object,
  })
  meta: MetaDto<T>;

  @ApiProperty({
    description: 'Pagination links for navigation',
    type: Object,
  })
  links: LinksDto;
}

export class ItemsDto<T> {
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

export class ItemDto<T> {
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

export class BaseRecordDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}

export class BelongToLessonAndUserDto extends BaseRecordDto {
  @ApiProperty()
  lesson: {
    id: string;
  };

  @ApiProperty()
  createdBy: {
    id: string;
  };
}

export class BelongToLessonDto extends BaseRecordDto {
  @ApiProperty()
  lesson: {
    id: string;
  };
}

export class BelongToUserDto extends BaseRecordDto {
  @ApiProperty()
  createdBy: {
    id: string;
  };
}
