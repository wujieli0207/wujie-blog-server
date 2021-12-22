import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { cloneDeep } from 'lodash';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogEntity } from './entities/blog.entity';

export interface BlogRo {
  list: BlogEntity[];
  count: number;
}

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
  ) {}
  /**
   *
   * @returns
   * @description 查询全部文章
   */
  async findAll(): Promise<BlogRo> {
    const qb = getRepository(BlogEntity)
      .createQueryBuilder('t_blog')
      .where('1=1')
      .where("t_blog.rc_state = 'E'")
      .orderBy('t_blog.create_time', 'DESC');

    const count = await qb.getCount();

    const blogList = await qb.getMany();
    return {
      list: blogList,
      count,
    };
  }

  /**
   *
   * @param id
   * @returns
   * @description 查询一篇文章
   */
  async findOne(id: string): Promise<BlogEntity> {
    return await this.blogRepository.findOne(id);
  }

  /**
   *
   * @param createBlogDto
   * @returns
   * @description 创建文章
   */
  async create(createBlogDto: CreateBlogDto) {
    const { blogTitle } = createBlogDto;

    if (!blogTitle) {
      throw new HttpException('缺少博客标题', 401);
    }

    const doc = await this.blogRepository.findOne({ where: { blogTitle } });

    if (doc) {
      throw new HttpException('文章已存在', 401);
    }
    return await this.blogRepository.save(createBlogDto);
  }

  /**
   *
   * @param id
   * @param updateBlogDto
   * @returns
   * @description 新增博客
   */
  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const existBlog = await this.blogRepository.findOne(id);
    if (!existBlog) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    const updateBlog = this.blogRepository.merge(existBlog, updateBlogDto);
    return this.blogRepository.save(updateBlog);
  }

  /**
   *
   * @param id
   * @returns
   * @description 删除博客
   */
  async remove(id: string) {
    const existBlog = await this.blogRepository.findOne(id);
    if (!existBlog) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    const deleteBlog = cloneDeep(existBlog);
    deleteBlog.rcState = 'D';

    return await this.blogRepository.update(id, deleteBlog);
  }
}
