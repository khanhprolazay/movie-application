import { Injectable } from "@nestjs/common";
import { Movie, Service } from "@app/shared";
import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { GenreService } from "../genre/genre.service";
import { MovieByGenresDTO } from "../dto/movie.dto";
import { MovieToGenre } from "@app/shared/entity/movie-to-genre.entity";

@Injectable()
export class MovieRepository extends Repository<Movie> {
  constructor( 
    @InjectDataSource(Service.MOVIE) 
    private readonly dataSource: DataSource,
    private readonly genreService: GenreService )
  {
    super(Movie, dataSource.createEntityManager());
  }

  async getByGenres(dto: MovieByGenresDTO): Promise<number[]> {
    const { genres, skip, limit } = dto;
    const genreIds = (await this.genreService.getIdsByNames(genres)).map(genre => genre.id);
    return await this.dataSource
                      .getRepository(MovieToGenre)
                      .createQueryBuilder('movieToGenre')
                      .select(["movieToGenre.movieId movieIds"])
                      .where('movieToGenre.genreId IN(:...genreIds)', { genreIds })
                      .groupBy('movieToGenre.movieId')
                      .orderBy('COUNT(movieToGenre.movieId)', 'DESC')
                      .take(limit)
                      .skip(skip)
                      .getRawMany()
                      .then(movies => movies.map(movie => movie.movieIds));
  }
  
}