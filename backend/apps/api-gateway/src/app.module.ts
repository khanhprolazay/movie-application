import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { JwtGuard } from './auth/guard';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';

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
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.get("REDIS_HOST"),
            port: configService.get("REDIS_PORT"),
          },
          password: configService.get("REDIS_PASSWORD"),
          ttl: 24 * 60 * 60 * 1000,
        })
      }), inject: [ConfigService]
    })
  ],
  providers: [JwtGuard]
})
export class AppModule{};
