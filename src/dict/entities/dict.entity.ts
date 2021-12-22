import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from 'src/common/entity/common.entity';

@Entity('t_sys_dict')
export class DictEntity extends CommonEntity {
  @Column({ name: 'dict_type' })
  dictType: string;

  @Column({ name: 'dict_code' })
  dictCode: string;

  @Column({ name: 'dict_value' })
  dictValue: string;

  @Column({ name: 'dict_desc' })
  dictDesc: string;
}
