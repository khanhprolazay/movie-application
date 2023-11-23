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
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisHost = configService.get("REDIS_HOST");
        const redisPort = configService.get("REDIS_PORT");
        const redisPassword = configService.get("REDIS_PASSWORD");

        return {
          store: await redisStore({
            socket: {
              host: redisHost,
              port: redisPort,
            },
            password: redisPassword,
            ttl: 6 * 60 * 60 * 1000, // 6 hours
          })
        }}
    }),
  ],
  providers: [JwtGuard]
})
export class AppModule{};
