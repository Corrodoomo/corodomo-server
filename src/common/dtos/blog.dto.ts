import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

import { BLOG_ACCESS_TYPE, BLOG_TAGS } from '@common/constants';
import { TransformProperty } from '@common/decorators/transform.decorator';

export class CreateBlogDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(3000)
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn(BLOG_TAGS)
  tag: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn(BLOG_ACCESS_TYPE)
  accessType: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsUUID()
  belongTo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  @TransformProperty(({ value }) => value.join(','))
  sharedFor?: string;
}

export class UpdateBlogDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(3000)
  content: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(BLOG_TAGS)
  tag: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(BLOG_ACCESS_TYPE)
  accessType: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsUUID()
  belongTo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  @TransformProperty(({ value }) => value.join(','))
  sharedFor?: string;
}
