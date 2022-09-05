import { RECEIVE_TYPE, MSG_TYPE } from '@/helper/feishu/message';
import { ApiProperty } from '@nestjs/swagger';
// 使用 class-validator 内置的验证装饰器对需要验证的 Dto 参数添加校验
import { IsNotEmpty, IsEnum } from 'class-validator';

export class GetUserTokenDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'xxxx', description: '飞书临时登录凭证' })
  code: string;

  app_token: string;
}

export class FeishuMessageDto {
  @IsNotEmpty()
  @IsEnum(RECEIVE_TYPE)
  @ApiProperty({ example: 'email', enum: RECEIVE_TYPE }) // 让文档识别出对应的枚举参数
  receive_id_type: RECEIVE_TYPE;

  @IsNotEmpty()
  @ApiProperty({ example: 'liux1118@qq.com' })
  receive_id?: string;

  @IsNotEmpty()
  @ApiProperty({ example: '{"text":" test content"}' })
  content?: string;

  @IsNotEmpty()
  @IsEnum(MSG_TYPE)
  @ApiProperty({ example: 'text', enum: MSG_TYPE })
  msg_type?: MSG_TYPE;
}

export class FeishuUserInfo {
  accessToken?: string;
  email: string;
  avatarUrl: string;
  avatarThumb: string;
  avatarBig: string;
  avatarMiddle: string;
  mobile: string;
  enName: string;
  name: string;
  feishuUserId: string;
  feishuUnionId: string;
}
