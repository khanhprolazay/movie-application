import { Injectable } from "@nestjs/common";
import { Movie } from "@app/shared";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class MovieRepository extends Repository<Movie> {
  constructor( private readonly dataSource: DataSource ) {
    super(Movie, dataSource.createEntityManager());
  }

  // getById(id: number) {
  //   this.createQueryBuilder().
  // }
}