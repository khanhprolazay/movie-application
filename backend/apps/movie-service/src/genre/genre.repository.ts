import { Injectable } from "@nestjs/common";
import { Genre, Service } from "@app/shared";
import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";

@Injectable()
export class GenreRepository extends Repository<Genre> {
  constructor( 
    @InjectDataSource(Service.MOVIE) 
    private readonly dataSource: DataSource ) 
  {
    super(Genre, dataSource.createEntityManager());
  }
}