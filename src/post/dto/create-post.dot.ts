import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: '文章标题必填' })
  @ApiProperty({ description: '文章标题' })
  readonly title: string;

  @IsNotEmpty({ message: '作者必填' })
  @ApiProperty({ description: '作者' })
  readonly author: string;

  @ApiProperty({ description: '内容' })
  readonly content: string;

  @ApiProperty({ description: '文章封面' })
  readonly thumb_url: string;

  @IsNumber()
  @ApiProperty({ description: '文章类型' })
  readonly type: number;
}
