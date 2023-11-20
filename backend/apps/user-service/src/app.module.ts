import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule, Role, User, KafkaGroup, Service } from '@app/shared';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    UserModule, 
    RoleModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/env/${process.env.NODE_ENV}.env`
    }),
    
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => ({
        name: 'user',
        type: 'mysql',
        entities: [User, Role],
        host: configService.get('USER_DATABASE_HOST'),
        port: configService.get('USER_DATABASE_PORT'),
        database: configService.get('USER_DATABASE_NAME'),
        username: configService.get('USER_DATABASE_USER_USERNAME'),
        password: configService.get('USER_DATABASE_USER_PASSWORD'),
        synchronize: true
      }), 
    }),
  ],
})
export class AppModule {}

