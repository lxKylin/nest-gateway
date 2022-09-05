import { CacheModule, Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// 进行多环境配置
import { ConfigModule } from '@nestjs/config';
// 自定义配置项使用环境变量
import { getConfig } from './utils';
//
import * as redisStore from 'cache-manager-redis-store';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';

@Module({
  // 使用默认环境配置 dotenv进行解析
  // imports: [ConfigModule.forRoot(), UserModule],
  // 自定义YAML
  // 自定义前禁用默认读取.env的规则
  imports: [
    // 全局配置缓存
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: getConfig('REDIS_CONFIG').host,
      port: getConfig('REDIS_CONFIG').port,
      auth_pass: getConfig('REDIS_CONFIG').auth,
      db: getConfig('REDIS_CONFIG').db
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      // load 方法中传入的 getConfig 是一个函数，并不是直接 JSON 格式的配置对象，直接添加变量会报错。
      load: [getConfig]
    }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  // controllers: [AppController],
  // providers: [AppService]
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
