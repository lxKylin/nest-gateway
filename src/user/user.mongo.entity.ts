// 注册实体
// 此外应该注意我们创建的实体类文件命名后缀为 entity.ts，
// 而在上文数据库连接的配置（src/common/database/database.providers.ts）中有一个 entities 参数：
import { Entity, Column, UpdateDateColumn, ObjectIdColumn } from 'typeorm';

export enum UserStatus {
  disabled = 0,
  enabled = 1
}

@Entity()
export class User {
  // 在 MongoDB 里面使用的是 ObjectIdColumn 作为类似 Mysql 的自增主键，来保证数据唯一性，只是类似，并不是跟普通自增主键一样会递增，把它看成 uuid 类似即可。
  @ObjectIdColumn()
  id?: number;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  username: string;

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  avatarUrl: string;

  @Column({ default: null })
  avatarThumb?: string;

  @Column({ default: null })
  avatarBig?: string;

  @Column({ default: null })
  avatarMiddle?: string;

  @Column({ default: null })
  mobile?: string;

  @Column({ default: null })
  enName?: string;

  @Column({ default: null })
  feishuUnionId?: string;

  @Column({ default: null })
  feishuUserId?: string;

  @Column({ default: null })
  departmentName?: string;

  @Column({ default: null })
  departmentId?: string;

  @Column({ default: UserStatus.enabled })
  status?: UserStatus;

  @UpdateDateColumn()
  updateTime?: string;
}
