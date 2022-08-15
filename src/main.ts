// 替换使用Fastify
import { VersioningType } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // 接口版本化管理
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(3000, () => {
    console.log(`项目运行在http://localhost:3000`);
  });
}

bootstrap();

// nest默认使用Express
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000, () => {
//     console.log(`项目运行在http://localhost:3000`);
//   });
// }
// bootstrap();
