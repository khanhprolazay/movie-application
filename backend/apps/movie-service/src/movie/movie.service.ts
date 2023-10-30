import { Injectable } from "@nestjs/common";
import { BaseService, LoggerService, MovieEntity } from "@app/shared";
import { MovieRepository } from "./movie.repository";
import { Between, In, IsNull, Not } from "typeorm";
import { startOfYear, endOfYear } from "date-fns";
import { MovieByDayDTO, MovieByGenresDTO, MovieByRatingDTO, MovieByYearDTO } from "../dto/movie.dto";

@Injectable()
export class MovieService extends BaseService<MovieEntity, MovieRepository>{
  constructor(
    protected readonly loggerService: LoggerService,
    protected readonly repository: MovieRepository,
  ) {
    super(repository, loggerService);
  }

  async getByYear(dto: MovieByYearDTO) {
    const { year, skip, limit } = dto;
    const formatYear = new Date(year, 1, 1);

    return await this.repository.find({
      order: { release: "DESC"},
      take: limit,
      skip: skip,
      where: {
        release: Between(startOfYear(formatYear), endOfYear(formatYear))
      },
      select: {
        id: true,
        title: true,
        rating: true,
        imageUrl: true,
        release: true,
        banner: true,
        movieLength: true,
      }
    })
  }

  async getByRating(dto: MovieByRatingDTO) {
    const { skip, limit } = dto;
    
    return await this.repository.find({
      order: { rating: "DESC" },
      take: limit,
      skip: skip,
      select: {
        id: true,
        title: true,
        rating: true,
        imageUrl: true,
        release: true,
        banner: true,
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
      },
      select: {
        id: true,
        title: true,
        rating: true,
        imageUrl: true,
        release: true,
        banner: true,
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
      select: {
        id: true,
        title: true,
        rating: true,
        imageUrl: true,
        release: true,
        banner: true,
        movieLength: true,
      }
    })
  }

  override async getById(id: number){
    const results = await this.repository.find({
      relations: {
        genres: true,
        actors: { actor: true }
      },
      select: {
        imdbId: true,
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