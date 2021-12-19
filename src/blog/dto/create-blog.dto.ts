import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty({ message: '博客标题必填' })
  @ApiProperty({ description: '博客标题' })
  readonly blogTitle: string;

  @IsNotEmpty({ message: '博客摘要必填' })
  @ApiProperty({ description: '博客摘要' })
  readonly blogAbstract: string;

  @ApiProperty({ description: '博客banner' })
  readonly blogBanner: string;

  @ApiProperty({ description: '博客状态' })
  readonly blogState: number;

  @IsNotEmpty({ message: '博客markdown内容必填' })
  @ApiProperty({ description: '博客markdown内容' })
  readonly mdArticle: string;

  @ApiProperty({ description: '博客html内容' })
  readonly htmlArticle: string;

  @ApiProperty({ description: '发布日期' })
  readonly publishDate: Date;

  @ApiProperty({ description: '状态' })
  readonly rcState: string;

  @ApiProperty({ description: '创建人' })
  readonly createBy: string;

  @ApiProperty({ description: '更新人' })
  readonly updateBy: string;
}
