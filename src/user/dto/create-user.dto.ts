/**
 * DTO推荐使用类。为什么？
 * 类是 JavaScript ES6 标准的一部分，因此它们在编译后的 JavaScript 中被保留为实际实体。
 * 另一方面，由于 TypeScript 接口在转换过程中被删除，所以 Nest 不能在运行时引用它们
 */
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
