import { Injectable } from "@nestjs/common";
import { GenreEntity } from "@app/shared";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class GenreRepository extends Repository<GenreEntity> {
  constructor( private readonly dataSource: DataSource ) {
    super(GenreEntity, dataSource.createEntityManager());
  }
}