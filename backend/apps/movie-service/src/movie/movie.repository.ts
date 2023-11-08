import { Injectable } from "@nestjs/common";
import { Movie, Service } from "@app/shared";
import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";

@Injectable()
export class MovieRepository extends Repository<Movie> {
  constructor( 
    @InjectDataSource(Service.MOVIE) 
    private readonly dataSource: DataSource ) 
  {
    super(Movie, dataSource.createEntityManager());
  }
}