import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { PostEntity } from './post.entity';

export interface PostRo {
  list: PostEntity[];
  count: number;
}

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  /**
   *
   * @param post
   * @returns
   * @description 创建文章
   */
  async create(post: Partial<PostEntity>): Promise<PostEntity> {
    const { title } = post;
    if (!title) {
      throw new HttpException('缺少文章标题', 401);
    }
    const doc = await this.postRepository.findOne({ where: { title } });

    if (doc) {
      throw new HttpException('文章已存在', 401);
    }
    return await this.postRepository.save(post);
  }

  /**
   *
   * @param query
   * @returns
   * @description 获取文章列表
   */
  async findAll(query): Promise<PostRo> {
    const qb = await getRepository(PostEntity).createQueryBuilder('post');
    qb.where('1=1');
    qb.orderBy('post.create_time', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const posts = await qb.getMany();
    return { list: posts, count };
  }

  /**
   *
   * @param id
   * @returns
   * @description 获取指定文章
   */
  async findById(id: string): Promise<PostEntity> {
    return await this.postRepository.findOne(id);
  }

  /**
   *
   * @param id
   * @param post
   * @returns
   * @description 更新某篇文章
   */
  async updateById(id: string, post): Promise<PostEntity> {
    const existPost = await this.postRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    const updatePost = this.postRepository.merge(existPost, post);
    return this.postRepository.save(updatePost);
  }

  /**
   *
   * @param id
   * @returns
   * @description 删除文章
   */
  async remove(id: string) {
    const existPost = await this.postRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    return await this.postRepository.remove(existPost);
  }
}
