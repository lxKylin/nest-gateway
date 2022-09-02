// 注册实体
// 此外应该注意我们创建的实体类文件命名后缀为 entity.ts，
// 而在上文数据库连接的配置（src/common/database/database.providers.ts）中有一个 entities 参数：
import { Entity, Column, UpdateDateColumn, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  // 在 MongoDB 里面使用的是 ObjectIdColumn 作为类似 Mysql 的自增主键，来保证数据唯一性，只是类似，并不是跟普通自增主键一样会递增，把它看成 uuid 类似即可。
  @ObjectIdColumn()
  id?: number;

  @Column({ default: null })
  name: string;
}
