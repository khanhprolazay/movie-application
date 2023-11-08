import { Injectable } from "@nestjs/common";
import { Genre } from "@app/shared";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class GenreRepository extends Repository<Genre> {
  constructor( private readonly dataSource: DataSource ) {
    super(Genre, dataSource.createEntityManager());
  }
}