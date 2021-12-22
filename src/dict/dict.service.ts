import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { cloneDeep } from 'lodash';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { DictEntity } from './entities/dict.entity';

export interface IDictRo {
  list: DictEntity[];
  count: number;
}

@Injectable()
export class DictService {
  constructor(
    @InjectRepository(DictEntity)
    private readonly dictRepository: Repository<DictEntity>,
  ) {}

  /**
   *
   * @param createDictDto
   * @returns
   * @description 新增字典
   */
  async create(createDictDto: CreateDictDto) {
    const { dictType, dictCode, dictValue } = createDictDto;

    if (!dictType || !dictCode || !dictValue) {
      throw new HttpException('缺少字典描述，字典编码，字典值', 401);
    }

    const dict = await this.dictRepository.findOne({
      where: {
        dictType,
        dictCode,
        dictValue,
      },
    });

    if (dict) {
      throw new HttpException('该字典值已存在', 401);
    }
    return await this.dictRepository.save(createDictDto);
  }

  /**
   *
   * @returns
   * @description 查询全部字典列表
   */
  async findAll(): Promise<IDictRo> {
    const qb = getRepository(DictEntity)
      .createQueryBuilder('t_sys_dict')
      .where('1=1')
      .where("t_sys_dict.rc_state = 'E'")
      .orderBy('t_sys_dict.dict_type, t_sys_dict.dict_code');

    const count = await qb.getCount();

    const list = await qb.getMany();

    return {
      list,
      count,
    };
  }

  /**
   *
   * @param id
   * @returns
   * @description 查询某一条字典
   */
  async findOne(id: string): Promise<DictEntity> {
    return await this.dictRepository.findOne(id);
  }

  /**
   *
   * @param id
   * @param updateDictDto
   * @returns
   * @description 更新某一条字典
   */
  async update(id: string, updateDictDto: UpdateDictDto) {
    const existDict = await this.dictRepository.findOne(id);
    if (!existDict) {
      throw new HttpException(`id${id}的字典不存在`, 401);
    }
    const updateBlog = this.dictRepository.merge(existDict, updateDictDto);
    return this.dictRepository.save(updateBlog);
  }

  /**
   *
   * @param id
   * @returns
   * @description 删除某一条字典
   */
  async remove(id: string) {
    const existDict = await this.dictRepository.findOne(id);
    if (!existDict) {
      throw new HttpException(`id${id}的字典不存在`, 401);
    }
    const deleteDict = cloneDeep(existDict);
    deleteDict.rcState = 'D';

    return await this.dictRepository.update(id, deleteDict);
  }
}
