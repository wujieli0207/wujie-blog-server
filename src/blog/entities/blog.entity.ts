import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('t_blog')
export class BlogEntity {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({ name: 'blog_id' })
  blogId: string;

  @Column({ name: 'blog_title', length: 100 })
  blogTitle: string;

  @Column({ name: 'blog_abstract', length: 1000 })
  blogAbstract: string;

  @Column({ name: 'blog_banner', length: 500 })
  blogBanner: string;

  @Column({ name: 'blog_state' })
  blogState: number;

  @Column({ name: 'md_article', type: 'text' })
  mdArticle: string;

  @Column({ name: 'html_article', type: 'text' })
  htmlArticle: string;

  @Column({ name: 'publish_date', type: 'datetime' })
  publishDate: Date;

  @Column({ name: 'rc_state', length: 2 })
  rcState: string;

  @Column({ name: 'create_by', length: 100 })
  createBy: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({ name: 'update_by', length: 100 })
  updateBy: string;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;
}
