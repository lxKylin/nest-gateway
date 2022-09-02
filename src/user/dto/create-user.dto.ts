import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
//ApiProperty是对数据类型的描述
export class CreateUserDto {
  @ApiProperty({ description: 'id', default: 1 })
  id?: string;

  @ApiProperty({ description: '名称', default: 'Arms' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '邮箱', default: 'liux1118@qq.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '用户名', default: 'Kylin' })
  @IsNotEmpty()
  username: string;
}
