import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// 进行多环境配置
import { ConfigModule } from '@nestjs/config';
// 自定义配置项使用环境变量
import { getConfig } from './utils';

@Module({
  // 使用默认环境配置 dotenv进行解析
  // imports: [ConfigModule.forRoot(), UserModule],
  // 自定义YAML
  // 自定义前禁用默认读取.env的规则
  imports: [
    // 全局配置缓存
    CacheModule.register({
      isGlobal: true
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      // load 方法中传入的 getConfig 是一个函数，并不是直接 JSON 格式的配置对象，直接添加变量会报错。
      load: [getConfig]
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
