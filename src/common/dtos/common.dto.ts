import { TransformProperty } from '@common/decorators/transform.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

// DTO cho PaginateQuery
export class PaginateQueryDto {
  @IsOptional()
  @IsNumber()
  page: number = 1;

  @IsOptional()
  @IsNumber()
  limit: number = 10;

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
