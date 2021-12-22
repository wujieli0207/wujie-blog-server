import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'rc_state', default: 'E' })
  rcState: string;

  @Column({ name: 'create_by' })
  createBy: string;

  @CreateDateColumn({
    name: 'create_time',
  })
  createTime: Date;

  @Column({ name: 'update_by' })
  updateBy: string;

  @UpdateDateColumn({
    name: 'update_time',
  })
  updateTime: Date;
}
