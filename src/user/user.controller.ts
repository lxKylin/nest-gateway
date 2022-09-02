import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  VERSION_NEUTRAL
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { BusinessException } from 'src/common/exceptions/business.exception';

import { ConfigService } from '@nestjs/config';

/**
 * Controller是一个装饰器
 * 'user'相当于路由前缀
 * Version是版本号装饰器，使用了之后需要携带版本号才能正常进行Http请求
 */

// 设置swagger文档标签分类
@ApiTags('用户')
@Controller('user')
// 对整个Controller进行版本控制
// @Controller({
//   path: 'user',
//   version: '1'
// })
export class UserController {
  constructor(
    // 依赖注入的方式，引入service
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  @ApiOperation({
    summary: '新增用户' // 接口描述信息
  })
  @Post('/add')
  // @Body是指获取到（http请求）客户端传递过来的body体中的数据，将数据给createUserDto这个变量，CreateUserDto是TS类型约束
  // createUserDto可自定义
  create(@Body() user: CreateUserDto) {
    return this.userService.createOrSave(user);
  }

  // 伪造业务异常场景
  @Get('findBusinessError')
  // 不需要携带版本或默认指定版本1
  @Version([VERSION_NEUTRAL, '1'])
  findBusinessError() {
    const a: any = {};
    try {
      console.log(a.b.c);
    } catch (error) {
      throw new BusinessException('你这个参数错了');
    }
    return this.userService.findAll();
  }
  @Get('getTestName')
  getTestName() {
    return this.configService.get('TEST_VALUE').name;
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
