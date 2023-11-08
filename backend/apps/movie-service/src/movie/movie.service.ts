import { Injectable } from "@nestjs/common";
import { BaseService, LoggerService, Movie } from "@app/shared";
import { MovieRepository } from "./movie.repository";
import { Between, In, IsNull, LessThanOrEqual, Like, MoreThan, Not } from "typeorm";
import { startOfYear, endOfYear } from "date-fns";
import { MovieByDayDTO, MovieByGenresDTO, MovieByRatingDTO, MovieBySeachDTO, MovieByUpcomingDTO, MovieByYearDTO } from "../dto/movie.dto";

@Injectable()
export class MovieService extends BaseService<Movie, MovieRepository>{
  constructor(
    protected readonly loggerService: LoggerService,
    protected readonly repository: MovieRepository,
  ) {
    super(repository, loggerService);
  }

  async getByYear(dto: MovieByYearDTO) {
    const { year, skip, limit } = dto;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const beginDate = startOfYear(currentDate);
    const endDate = year === currentYear ? currentDate : endOfYear(currentDate);

    return await this.repository.find({
      order: { release: "DESC"},
      take: limit,
      skip: skip,
      where: {
        release: Between(beginDate, endDate),
      },
      select: {
        id: true,
        title: true,
        rating: true,
        imageUrl: true,
        release: true,
        movieLength: true,
      }
    })
  }

  async getByRating(dto: MovieByRatingDTO) {
    const { skip, limit } = dto;
  
    return await this.repository.find({
      order: { 
        voteCount: "DESC",
        rating: "DESC" 
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
        imageUrl: true,
        release: true,
        movieLength: true,
      }
    })
  }

  async getByGenres(dto: MovieByGenresDTO) {
    const { genres, skip, limit } = dto;
  
    return await this.repository.find({
      order: { release: "DESC"},
      take: limit,
      skip: skip,
      where: {
        genres: {
          name: In(genres),
        },
        release: LessThanOrEqual(new Date()),
      },
      select: {
        id: true,
        title: true,
        rating: true,
        imageUrl: true,
        release: true,
        movieLength: true,
      }
    })
  }

  async getByDay(dto: MovieByDayDTO) {
    const { skip, limit } = dto;
    return await this.repository.find({
      order: { release: "DESC" },
      take: limit,
      skip: skip,
      where: {
        release: LessThanOrEqual(new Date()),
      },
      select: {
        id: true,
        title: true,
        rating: true,
        imageUrl: true,
        release: true,
        movieLength: true,
      }
    })
  }

  async getBySearch(dto: MovieBySeachDTO) {
    const { search, skip, limit } = dto;
    return await this.repository.find({
      order: { release: "DESC" },
      take: limit,
      skip: skip,
      where: {
        title: Like(`%${search}%`),
        release: LessThanOrEqual(new Date()),
      },
      select: {
        id: true,
        title: true,
        rating: true,
        imageUrl: true,
        release: true,
        movieLength: true,
      },
    })
  }

  async getByUpcoming(dto: MovieByUpcomingDTO) {
    const { skip, limit } = dto;
    return await this.repository.find({
      order: { release: "ASC" },
      skip: skip,
      take: limit,
      where: {
        release: MoreThan(new Date()),
      },
      select: {
        id: true,
        title: true,
        rating: true,
        imageUrl: true,
        release: true,
        movieLength: true,
      },
    })
  }

  override async getById(id: number){
    const results = await this.repository.find({
      relations: {
        genres: true,
        trailers: true,
        actors: { actor: true },
      },
      select: {
        imdbId: true,
        trailers: {
          type: true,
          imdbId: true,
        },
        genres: { name: true },
        actors: {
          role: true,
          actor: {
            id: true,
            name: true,
            imageUrl: true
          }
        }
      },
      where: {
        id,
        actors: {
          actor: {
            imageUrl: Not(IsNull())
          }
        }
      }
    });
    return results[0];

  }
}