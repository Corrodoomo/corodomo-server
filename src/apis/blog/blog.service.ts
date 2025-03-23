import { Blog } from '@modules/database/entities';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';

import { DeleteResultDto, InsertResultDto, UpdateResultDto } from '@common/dtos';
import { CreateBlogDto, UpdateBlogDto } from '@common/dtos/blog.dto';
import { ItemDto, ItemsDto } from '@common/dtos/common.dto';
import { Messages } from '@common/enums';

import { BlogRepository } from './blog.repository';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  /**
   * Group blog by belongTo
   * @param blogs
   * @returns
   */
  public groupBlogs = (blogs: Blog[]) => {
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
  };

  /**
   * Get my blogs
   * @param userId
   * @param blog
   * @returns
   */
  public async getMyBlogs(userId: string) {
    // Get blog by user id
    const blogs = await this.blogRepository.find({ where: { createdBy: { id: userId } } });

    // Return result
    return new ItemsDto(this.groupBlogs(blogs));
  }

  /**
   * Get my blogs
   * @param userId
   * @param blog
   * @returns
   */
  public async getDetail(userId: string, blogId: string) {
    // Get blog by user id
    const blog = await this.blogRepository.getRawOne(blogId, [
      'id',
      'title',
      'content',
      'tag',
      'access_type as "accessType"',
      'created_by as "createdBy"',
      'updated_at as "updatedAt"',
    ]);

    // Check if blog is empty
    if (isEmpty(blog)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Split sharedFor to uuid string array
    const sharedFor = blog.sharedFor ? blog.sharedFor.split(',') : [];

    // Check if blog is not created by user or not shared for this user
    if (blog.createdBy !== userId && !sharedFor.includes(userId)) {
      throw new ForbiddenException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Return result
    return new ItemDto(blog);
  }

  /**
   * Create blog
   * @param userId
   * @param blog
   * @returns
   */
  public async create(userId: string, body: CreateBlogDto) {
    // Create blog
    const savedBlog = await this.blogRepository.save({ ...body, createdBy: { id: userId } });

    // Return result
    return new InsertResultDto(savedBlog, 1);
  }

  /**
   * Update blog
   * @param userId
   * @param blog
   * @returns
   */
  public async update(userId: string, blogId: string, body: UpdateBlogDto) {
    // Get blog by id
    const blog = await this.blogRepository.getRawOne(blogId, [
      'id',
      'created_by as "createdBy"',
      'shared_for as "sharedFor"',
    ]);

    // Check if blog is empty
    if (isEmpty(blog)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }
    
    // Split sharedFor to uuid string array
    const sharedFor = blog.sharedFor ? blog.sharedFor.split(',') : [];

    // Check if blog is not created by user
    if (blog.createdBy !== userId && !sharedFor.includes(userId)) {
      throw new ForbiddenException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Create blog
    await this.blogRepository.update(blogId, body);

    // Return result
    return new UpdateResultDto(1);
  }

  /**
   * Delete blog
   * @param userId
   * @param blog
   * @returns
   */
  public async delete(userId: string, blogId: string) {
    // Get blog by id
    const blog = await this.blogRepository.getRawOne(blogId, ['id', 'created_by as "createdBy"']);

    // Check if blog is empty
    if (isEmpty(blog)) {
      throw new BadRequestException(Messages.ITEM_NOT_FOUND);
    }

    // Check if blog is not created by user
    if (blog.createdBy !== userId) {
      throw new ForbiddenException(Messages.INVALID_ACCESS_RESOURCE);
    }

    // Create blog
    await this.blogRepository.delete(blogId);

    // Return result
    return new DeleteResultDto(1);
  }
}
