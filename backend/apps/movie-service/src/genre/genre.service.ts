import { Injectable } from "@nestjs/common";
import { BaseService, GenreEntity, LoggerService } from "@app/shared";
import { GenreRepository } from "./genre.repository";

@Injectable()
export class GenreService extends BaseService<GenreEntity, GenreRepository> {
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