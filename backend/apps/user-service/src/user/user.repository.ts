import { Injectable } from "@nestjs/common";
import { UserEntity } from "@app/shared";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor( private readonly dataSource: DataSource ) {
    super(UserEntity, dataSource.createEntityManager());
  }

  getByEmail(email: string): Promise<UserEntity | null> {
    return this.createQueryBuilder().where(`email = :email`, {email: email}).getOne();
  }
}