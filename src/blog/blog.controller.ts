import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@ApiTags('博客')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/findAll')
  @ApiOperation({ summary: '查询全部博客' })
  findAll() {
    return this.blogService.findAll();
  }

  @Get('/findOne/:id')
  @ApiOperation({ summary: '查询某一篇博客' })
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Post('/create')
  @ApiOperation({ summary: '创建博客' })
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Post('/update/:id')
  @ApiOperation({ summary: '更新博客' })
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Post('/remove/:id')
  @ApiOperation({ summary: '删除博客' })
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
