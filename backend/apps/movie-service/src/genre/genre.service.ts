import { Injectable } from "@nestjs/common";
import { BaseService, Genre, LoggerService } from "@app/shared";
import { GenreRepository } from "./genre.repository";
import { In } from "typeorm";

@Injectable()
export class GenreService extends BaseService<Genre, GenreRepository> {
  constructor( 
    protected readonly loggerService: LoggerService,
    protected readonly repository: GenreRepository
  ) {
    super(repository, loggerService)
  }

  async getAll() {
    return await this.repository.find({
      select: { id: true, name: true, }
    });
  }

  async getIdsByNames(names: string[]) {
    return await this.repository.find({
      where: { name: In(names) },
      select: { id: true }
    });
  }
}