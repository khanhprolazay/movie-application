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

  async getByGenres(dto: MovieByGenresDTO) {
    const { genres, skip, limit } = dto;
    const genreIds = (await this.genreService.getIdsByNames(genres)).map(genre => genre.id);
    const builder = this.dataSource.getRepository(MovieToGenre).createQueryBuilder('movieToGenre');

    const movieIds = builder
                      .select(["movieToGenre.movieId movieId"])
                      .where('movieToGenre.genreId IN(:...genreIds)', { genreIds })
                      .groupBy('movieToGenre.movieId')
                      .having('COUNT(movieId) = :genreIdsLength', { genreIdsLength: genreIds.length })
                      .skip(skip)
                      .take(limit)
                      .getRawMany()
                      .then(movies => movies.map(movie => movie.movieId));
                  
    const total = builder.createQueryBuilder()
                  .select("COUNT(*)", "total")
                  .from(subQuery => {
                      return subQuery
                      .select(["movieToGenre.movieId movieId"])
                      .from(MovieToGenre, "movieToGenre")
                      .where('movieToGenre.genreId IN(:...genreIds)', { genreIds })
                      .groupBy('movieToGenre.movieId')
                      .having('COUNT(movieId) = :genreIdsLength', { genreIdsLength: genreIds.length })
                    }, "i")
                  .getRawOne()
                  .then(result => parseInt(result.total));

    return await Promise.all([movieIds, total]).then(([movieIds, total]) => ({ movieIds, total }));            
  }
  
}