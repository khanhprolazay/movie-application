import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule, Actor, ActorToMovie, Genre, Movie, Trailer, KafkaGroup, Service } from '@app/shared';
import { MovieModule } from './movie/movie.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [
    LoggerModule,
    MovieModule,
    GenreModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/env/${process.env.NODE_ENV}.env`
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      name: Service.MOVIE,
      useFactory: (configService: ConfigService) => {
        return {
          name: 'movie',
          type: "mysql",
          entities: [Movie, Actor, ActorToMovie, Genre, Trailer],
          host: configService.get('MOVIE_DATABASE_HOST'),
          port: configService.get('MOVIE_DATABASE_PORT'),
          database: configService.get('MOVIE_DATABASE_NAME'),
          username: configService.get('MOVIE_DATABASE_USER_USERNAME'),
          password: configService.get('MOVIE_DATABASE_USER_PASSWORD'),
          synchronize: true
        }
      }
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
})
export class AppModule {}
