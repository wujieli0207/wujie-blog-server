import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostRo, PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dot';

@ApiTags('博客文章')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   *
   * @param post
   * @returns
   * @description 创建文章
   */
  @ApiOperation({ summary: '创建文章' })
  @Post('/create')
  async create(@Body() post: CreatePostDto) {
    return await this.postService.create(post);
  }

  /**
   *
   * @param query
   * @returns
   * @description 查询全部文章
   */
  @Get('/findAll')
  @ApiOperation({ summary: '查询全部文章' })
  async findAll(@Query() query): Promise<PostRo> {
    return await this.postService.findAll(query);
  }

  /**
   *
   * @param id
   * @returns
   * @description 查询指定文章
   */
  @Get('/findByid/:id')
  @ApiOperation({ summary: '查询指定文章' })
  async findByid(@Param('id') id: string) {
    return await this.postService.findById(id);
  }

  /**
   *
   * @param identity
   * @param post
   * @returns
   * @description 更新文章
   */
  @Post('/update')
  @ApiOperation({ summary: '更新文章' })
  async update(@Param('id') id: string, @Body() post) {
    return await this.postService.updateById(id, post);
  }

  /**
   *
   * @param id
   * @returns
   * @description 删除文章
   */
  @Post('/remove')
  @ApiOperation({ summary: '删除文章' })
  async remove(@Param('id') id: string) {
    return await this.postService.remove(id);
  }
}
