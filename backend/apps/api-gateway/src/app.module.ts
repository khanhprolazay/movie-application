import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { JwtGuard } from './auth/guard';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaGroup } from '@app/shared';
@Module({
  imports: [
    UserModule,
    AuthModule, 
    MovieModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/env/${process.env.NODE_ENV}.env`
    }), 

    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.get("REDIS_HOST"),
            port: configService.get("REDIS_PORT"),
          },
          password: configService.get("REDIS_PASSWORD"),
          ttl: 24 * 60 * 60 * 1000,
        })
      })
    }),

    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     name: 'manager',
    //     type: 'mysql',
    //     host: configService.get('MANAGER_DATABASE_HOST'),
    //     port: configService.get('MANAGER_DATABASE_PORT'),
    //     username: configService.get('MANAGER_DATABASE_USERNAME'),
    //     password: configService.get('MANAGER_DATABASE_PASSWORD'),
    //     database: configService.get('MANAGER_DATABASE_NAME'),
    //     entities: [KafkaGroup],
    //     synchronize: true,
    //   })
    // })
  ],
  providers: [JwtGuard]
})
export class AppModule{};
