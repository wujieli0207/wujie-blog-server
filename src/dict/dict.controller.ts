import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DictService } from './dict.service';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';

@Controller('dict')
@ApiTags('字典管理')
export class DictController {
  constructor(private readonly dictService: DictService) {}

  @Post('/create')
  @ApiOperation({ summary: '新增字典' })
  create(@Body() createDictDto: CreateDictDto) {
    return this.dictService.create(createDictDto);
  }

  @Get('findAll')
  @ApiOperation({ summary: '查询全部字典列表' })
  findAll() {
    return this.dictService.findAll();
  }

  @Get('/findOne/:id')
  @ApiOperation({ summary: '查询某一条字典' })
  findOne(@Param('id') id: string) {
    return this.dictService.findOne(id);
  }

  @Post('/update/:id')
  @ApiOperation({ summary: '更新某一条字典' })
  update(@Param('id') id: string, @Body() updateDictDto: UpdateDictDto) {
    return this.dictService.update(id, updateDictDto);
  }

  @Post('/remove/:id')
  @ApiOperation({ summary: '删除某一条字典' })
  remove(@Param('id') id: string) {
    return this.dictService.remove(id);
  }
}
