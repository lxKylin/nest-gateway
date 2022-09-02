import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/common/database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserProviders } from './user.providers';
// import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { FeishuService } from './feishu/feishu.service';
import { FeishuController } from './feishu/feishu.controller';

@Module({
  imports: [DatabaseModule],
  // 已全局在app.module.ts开启缓存配置，所以不需要再注册
  // imports: [CacheModule.register()],
  controllers: [FeishuController, UserController],
  providers: [...UserProviders, UserService, FeishuService],
  exports: [UserService]
})
export class UserModule {}
// import { Module } from '@nestjs/common';
// import { UserService } from './user.service';
// import { UserController } from './user.controller';

// @Module({
//   controllers: [UserController],
//   providers: [UserService],
// })
// export class UserModule {}
