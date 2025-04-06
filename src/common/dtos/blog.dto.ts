import { Blog } from '@modules/database/entities';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsIn, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

import { BLOG_ACCESS_TYPE, BLOG_TAGS } from '@common/constants';
import { TransformProperty } from '@common/decorators/transform.decorator';
import { ItemsMapper } from '@common/mappers';

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

export class GroupBlogsDto extends ItemsMapper<Blog> {
  constructor(blogs: Blog[]) {
    super(GroupBlogsDto.groupBlogs(blogs));
  }

  /**
   * Group blog by belongTo
   * @param blogs
   * @returns
   */
  public static groupBlogs(blogs: Blog[]) {
    // Create a map to store blogs
    const map = new Map();

    // Set all blogs to map
    blogs.forEach((blog) => {
      map.set(blog.id, blog);
    });

    // Loop through all blogs
    blogs.forEach((blog) => {
      if (blog.belongTo && map.has(blog.belongTo)) {
        const parentBlog = map.get(blog.belongTo);
        parentBlog.children = parentBlog.children || [];
        parentBlog.children.push(blog);
      }
    });

    // Return blogs
    return blogs.filter((blog) => !blog.belongTo);
  }
}
