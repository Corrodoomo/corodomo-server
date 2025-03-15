import { IsArray, IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

// DTO cho PaginateQuery
export class PaginateQueryDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sortBy?: [string, string][];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  searchBy?: string[];

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsObject()
  filter?: {
    [column: string]: string | string[];
  };

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
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

  @IsString()
  path: string;
}
