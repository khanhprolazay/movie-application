import { Injectable } from "@nestjs/common";
import { MovieEntity, UserEntity } from "@app/shared";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class MovieRepository extends Repository<MovieEntity> {
  constructor( private readonly dataSource: DataSource ) {
    super(MovieEntity, dataSource.createEntityManager());
  }

  // getById(id: number) {
  //   this.createQueryBuilder().
  // }
}