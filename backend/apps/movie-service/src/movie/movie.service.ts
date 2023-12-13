import { Inject, Injectable } from "@nestjs/common";
import { BaseService, LoggerService, Movie, PatternOption, Service } from "@app/shared";
import { MovieRepository } from "./movie.repository";
import { Between, In, LessThanOrEqual, Like, MoreThan } from "typeorm";
import { endOfYear } from "date-fns";
import { MovieByDayDTO, MovieByGenresDTO, MovieByRatingDTO, MovieBySeachDTO, MovieByUpcomingDTO, MovieByYearDTO } from "../dto/movie.dto";
import { ClientProxy } from "@nestjs/microservices";
import { first, switchMap } from "rxjs";
import { ApiTooManyRequestsResponse } from "@nestjs/swagger";

@Injectable()
export class MovieService extends BaseService<Movie, MovieRepository>{
  constructor(
    @Inject(Service.RECOMMENDATION)
    private readonly recommendationClient: ClientProxy,
    protected readonly loggerService: LoggerService,
    protected readonly repository: MovieRepository
  ) {
    super(repository, loggerService);
  }

  async getByYear(dto: MovieByYearDTO) {
    const { year, skip, limit } = dto;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const beginDate = new Date(year, 1, 1);
    const endDate = year === currentYear ? currentDate : endOfYear(beginDate);

    return await this.repository.findAndCount({
      order: { release: "DESC"},
      take: limit,
      skip: skip,
      where: {
        release: Between(beginDate, endDate),
      },
      relations: {
        genres: { genre: true },
      },
      select: {
        id: true,
        title: true,
        rating: true,
        release: true,
        imageUrl: true,
        posterPath: true,
        movieLength: true,
        genres: {
          genreId: true,
          genre: {
            name: true,
          }
        },
      }
    })
  }

  async getByRating(dto: MovieByRatingDTO) {
    const { skip, limit } = dto;
  
    return await this.repository.findAndCount({
      order: { 
        voteCount: "DESC",
        rating: "DESC" 
      },
      relations: {
        genres: { genre: true },
      },
      take: limit,
      skip: skip,
      where: {
        release: LessThanOrEqual(new Date()),
      },
      select: {
        id: true,
        title: true,
        rating: true,
        voteCount: true,
        release: true,
        imageUrl: true,
        posterPath: true,
        movieLength: true,
        genres: {
          genreId: true,
          genre: {
            name: true,
          }
        },
      }
    })
  }

  async getByDay(dto: MovieByDayDTO) {
    const { skip, limit } = dto;
    return await this.repository.findAndCount({
      order: { release: "DESC" },
      take: limit,
      skip: skip,
      where: {
        release: LessThanOrEqual(new Date()),
      },
      relations: { 
        genres: { genre: true },
       },
      select: {
        id: true,
        title: true,
        rating: true,
        release: true,
        imageUrl: true,
        posterPath: true,
        movieLength: true,
        genres: {
          genreId: true,
          genre: {
            name: true,
          }
        },
      }
    })
  }

  async getByGenres(dto: MovieByGenresDTO) { 
    const { movieIds, total} = await this.repository.getByGenres(dto);
    
    const movies = await this.repository.find({
      where: {
        id: In(movieIds),
      },
      relations: { 
        genres: { genre: true },
       },
      select: {
        id: true,
        title: true,
        rating: true,
        release: true,
        imageUrl: true,
        posterPath: true,
        movieLength: true,
        genres: {
          genreId: true,
          genre: {
            name: true,
          }
        },
      }
    });

    return [movies, total]
  }

  async getBySearch(dto: MovieBySeachDTO) {
    const { search, skip, limit } = dto;
    return await this.repository.findAndCount({
      order: { release: "DESC" },
      take: limit,
      skip: skip,
      where: {
        title: Like(`%${search}%`),
        release: LessThanOrEqual(new Date()),
      },
      relations: { 
        genres: { genre: true },
       },
      select: {
        id: true,
        title: true,
        rating: true,
        release: true,
        imageUrl: true,
        posterPath: true,
        movieLength: true,
        backdropPath: true,
        genres: {
          genreId: true,
          genre: {
            name: true,
          }
        },
      },
    })
  }

  async getByUpcoming(dto: MovieByUpcomingDTO) {
    const { skip, limit } = dto;
    return await this.repository.findAndCount({
      order: { release: "ASC" },
      skip: skip,
      take: limit,
      where: {
        release: MoreThan(new Date()),
      },
      relations: { genres: { genre: true } },
      select: {
        id: true,
        title: true,
        rating: true,
        release: true,
        imageUrl: true,
        posterPath: true,
        movieLength: true,
        genres: {
          genreId: true,
          genre: {
            name: true,
          }
        },
      },
    })
  }

  async getByRandomBackdrop() {
   const ids = await this.repository.createQueryBuilder()
    .select("movie.id")
    .where("movie.backdropPath IS NOT NULL")
    .orderBy("RAND()")
    .take(10)
    .getRawMany()
    .then(movies => movies.map(movie => movie.id));

    return await this.repository.find({
      where: { id: In(ids) },
      relations: { genres: { genre: true } },
      select: {
        id: true,
        title: true,
        rating: true,
        release: true,
        imageUrl: true,
        posterPath: true,
        movieLength: true,
        backdropPath: true,
        genres: {
          genreId: true,
          genre: {
            name: true,
          }
        },
      },
    })
  }

  async getByRandom() {
    const ids = await this.repository.createQueryBuilder()
      .select("movie.id")
      .orderBy("RAND()")
      .take(10)
      .getRawMany()
      .then(movies => movies.map(movie => movie.id));

    return await this.repository.find({
      where: { id: In(ids) },
      relations: { genres: { genre: true } },
      select: {
        id: true,
        title: true,
        rating: true,
        release: true,
        imageUrl: true,
        posterPath: true,
        movieLength: true,
        genres: {
          genreId: true,
          genre: {
            name: true,
          }
        },
      },
    })
  }

  override async getById(id: number){
    const results = await this.repository.find({
      relations: {
        genres: { genre: true },
        videos: true,
        casts: { actor: true },
        directors: { actor: true }
      },
      select: {
        id: true,
        imdbId: true,
        imageUrl: true,
        plot: true,
        title: true,
        rating: true,
        release: true,
        description: true,
        genres: {
          genreId: true,
          genre: {
            name: true,
          }
        },
        videos: {
          key: true,
          type: true,
          site: true,
          official: true,
          name: true,
          size: true,
        },
        casts: {
          role: true,
          actor: {
            id: true,
            name: true,
            imageUrl: true
          }
        },
        directors: {
          actorId: true,
          actor: {
            name: true,
            imageUrl: true,
          }
        }
      },
      where: { id }
    });
    return results.length === 0 ? null : results[0];

  }

  getByRecommend(imdbId: string) {
    return this.recommendationClient.send<string[]>(
      PatternOption["RECOMMENDATION.GET.BY_IMDB_ID"], imdbId
    )
    .pipe(
      first(),
      switchMap(async (imdbIds) => {
        if (imdbIds.length === 0) {
          const genres = await this.repository.findOne({
            where: { imdbId },
            relations: { genres: { genre: true } },
            select: { id: true, genres: true }
          })
          .then(movie => movie.genres.map(genre => genre.genre.name))
          .catch(() => []);
          
          return await this.getByGenres({ genres, limit: 20, skip: 0 }).then(result => result[0]);
        };
        
        return await this.repository.find({
          where: { imdbId: In(imdbIds) },
          relations: { genres: { genre: true } },
          select: {
            id: true,
            title: true,
            rating: true,
            release: true,
            imageUrl: true,
            posterPath: true,
            movieLength: true,
            genres: {
              genreId: true,
              genre: {
                name: true,
              }
            },
          },
        })
      })
    )
  }
}