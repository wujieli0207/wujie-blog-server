import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateDictDto {
  @IsNotEmpty({ message: '字典类型必填' })
  @ApiProperty({ description: '字典类型' })
  readonly dictType: string;

  @IsNotEmpty({ message: '字典编码必填' })
  @ApiProperty({ description: '字典编码' })
  readonly dictCode: string;

  @IsNotEmpty({ message: '字典值必填' })
  @ApiProperty({ description: '字典值' })
  readonly dictValue: string;

  @ApiProperty({ description: '字典描述' })
  readonly dictDesc: string;

  @ApiProperty({ description: '更新人' })
  readonly updateBy: string;
}
