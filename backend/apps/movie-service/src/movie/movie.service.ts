import { Injectable } from "@nestjs/common";
import { BaseService, LoggerService, MovieEntity } from "@app/shared";
import { MovieRepository } from "./movie.repository";
import { IsNull, Not } from "typeorm";

@Injectable()
export class MovieService extends BaseService<MovieEntity, MovieRepository>{
  constructor(
    protected readonly loggerService: LoggerService,
    protected readonly repository: MovieRepository,
  ) {
    super(repository, loggerService);
  }

  async getByPagination(skip: number, limit: number) {
    return await this.repository.find({
      order: { release: "DESC"},
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
        imdbId: false,
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