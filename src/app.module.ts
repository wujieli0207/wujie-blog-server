import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import envConfig from '../config/env';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostEntity } from './post/post.entity';
import { PostModule } from './post/post.module';
import { BlogModule } from './blog/blog.module';
import { BlogEntity } from './blog/entities/blog.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // 数据库类型
        entities: [PostEntity, BlogEntity], // 数据表实体
        host: configService.get('DB_HOST', 'localhost'), // 主机，默认为localhost
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USER', ''),
        password: configService.get('DB_PASSWORD', ''),
        database: configService.get('DB_DATABASE', ''),
        timezone: '+08:00', //服务器上配置的时区
        synchronize: false, //根据实体自动创建数据库表
      }),
    }),
    PostModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//     isGlobal: true,  // 设置为全局
//     envFilePath: [envConfig.path]
//    }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => ({
//         type: 'mysql', // 数据库类型
//         entities: [],  // 数据表实体
//         host: configService.get('DB_HOST', 'localhost'), // 主机，默认为localhost
//         port: configService.get<number>('DB_PORT', 3306), // 端口号
//         username: configService.get('DB_USER', 'root'),   // 用户名
//         password: configService.get('DB_PASSWORD', 'root'), // 密码
//         database: configService.get('DB_DATABASE', 'blog'), //数据库名
//         timezone: '+08:00', //服务器上配置的时区
//         synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
//       }),
//     }),
//     PostsModule,
//   ],
//  ...
// })
// export class AppModule {}
