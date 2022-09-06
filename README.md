## 笔记

- 使用命令创建`user.controller.ts`文件，co是 controller的别名

```bash
$ nest g co user = $ nest g controller user
```

- 使用命令直接新建关于`user`，`CURD`的四个模块，减少工作量

```shell
$ nest g resource user
```

- nest内置两个框架：`Express`以及`Fastify`，框架默认使用的是`Express`
  - `Express`：
  - `Fastify`：`Fastify`与其他主流 `HTTP` 框架对比，其在 `QPS`(并发处理请求)的效率上要远超其他框架，达到了几乎两倍的基准测试结果
- 替换模块框架，首先，安装对应的适配器依赖 `yarn add @nestjs/platform-fastify`

```ts
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
  await app.listen(3000);
}
bootstrap();
```
- 进行多环境配置`yarn add @nestjs/config`
- `Nest`默认使用`dotenv`进行解析环境配置
- `@nestjs/config` 默认会从项目根目录载入并解析一个`.env`文件，从`.env`文件和 `process.env` 合并环境变量键值对，并将结果存储到一个可以通过`ConfigService`访问的私有结构。

### extends和implements的区别
- `extends`：继承：一个新的接口或者类，从父类或者接口继承所有的属性和方法，不可以重写属性，但可以重写方法
- `implements`：实现：实现，一个新的类，从父类或者接口实现所有的属性和方法，同时可以重写属性和方法，包含一些新的功能

- 相同点
  - 都可以实现 类与类 之间的关联
  - 对于抽象类中的抽象方法都必须要实现

- 下面罗列它俩的不同点
  - extends可以实现 接口与接口，接口与类 的继承，而implements不能实现接口与接口，接口与类的实现
  - implements可以实现 类实现接口，而extends不能实现类继承接口
  - 使用implements时，需要定义或实现所有属性和方法，而extends只需要重新定义或者实现方法即可，对于属性来说，是可以直接继承，无需单独定义
  
- 举例来说，门是一个类，防盗门是门的子类。如果防盗门有一个报警器的功能，我们可以简单的给防盗门添加一个报警方法。这时候如果有另一个类，车，也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它：
```ts
interface Alarm {
    alert(): void;
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert');
    }
}

class Car implements Alarm {
    alert() {
        console.log('Car alert');
    }
}
```
- 一个类可以实现多个接口：
```ts
interface Alarm {
    alert(): void;
}

interface Light {
    lightOn(): void;
    lightOff(): void;
}

class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
```
- DTO推荐使用类。为什么？
- 类是 JavaScript ES6 标准的一部分，因此它们在编译后的 JavaScript 中被保留为实际实体。
- 另一方面，由于 TypeScript 接口在转换过程中被删除，所以 Nest 不能在运行时引用它们
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)
