import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule, ActorEntity, ActorToMovie, AwardEntity, GenreEntity, MovieEntity, QuoteEntity, TrademarkEntity, TriviaEntity, BioEntity } from '@app/shared';
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
      useFactory: (configService: ConfigService) => {
        return {
          type: "mysql",
          entities: [MovieEntity, ActorEntity, ActorToMovie, AwardEntity, GenreEntity, QuoteEntity, TrademarkEntity, TriviaEntity, BioEntity],
          host: configService.get('MOVIE_SERVICE_DATABASE_HOST'),
          port: configService.get('MOVIE_SERVICE_DATABASE_PORT'),
          database: configService.get('MOVIE_SERVICE_DATABASE_NAME'),
          username: configService.get('MOVIE_SERVICE_DATABASE_USER_USERNAME'),
          password: configService.get('MOVIE_SERVICE_DATABASE_USER_PASSWORD'),
          synchronize: true
        }
      }, inject: [ConfigService]
    })
  ],
})
export class AppModule {}
