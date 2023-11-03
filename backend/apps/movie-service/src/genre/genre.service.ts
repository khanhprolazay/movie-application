import { Injectable } from "@nestjs/common";
import { BaseService, Genre, LoggerService } from "@app/shared";
import { GenreRepository } from "./genre.repository";

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
}