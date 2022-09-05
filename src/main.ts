// 替换使用Fastify
import {
  ValidationPipe,
  VersioningType, // 接口版本控制
  VERSION_NEUTRAL // 接口版本控制
} from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';

import fastify from 'fastify';

import { AppModule } from './app.module';

import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { FastifyLogger } from './common/logger';

import { generateDocument } from './doc';

import fastifyCookie from '@fastify/cookie';

declare const module: any;

async function bootstrap() {
  const fastifyInstance = fastify({
    logger: FastifyLogger
  });
  // 为了框架的性能使用 Fastify 来替换底层框架之后，需要使用下述代码来开启 Fastify 的日志系统：
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastifyInstance)
  );

  app.register(fastifyCookie, {
    secret: 'my-secret' // for cookies signature
  });

  // 设置全局路由前缀
  app.setGlobalPrefix('api');

  // 接口版本化管理
  app.enableVersioning({
    // 全局配置请求配置
    // defaultVersion: '1',
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI
  });

  // 统一响应体格式 useGlobalInterceptors 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 异常过滤器 useGlobalFilters 全局异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 启动全局字段校验，保证请求接口字段校验正确
  app.useGlobalPipes(new ValidationPipe());

  // 创建swagger文档
  generateDocument(app);

  // 添加热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(1029, () => {
    console.log(`项目运行在http://localhost:1029`);
  });
}

bootstrap();

// nest默认使用Express
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
// 普通开启日志
//   const app = await NestFactory.create(ApplicationModule, { logger: true });
//   await app.listen(3000, () => {
//     console.log(`项目运行在http://localhost:3000`);
//   });
// }
// bootstrap();
