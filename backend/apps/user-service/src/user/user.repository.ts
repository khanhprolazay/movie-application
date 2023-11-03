import { Injectable } from "@nestjs/common";
import { User } from "@app/shared";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor( private readonly dataSource: DataSource ) {
    super(User, dataSource.createEntityManager());
  }

  getByEmail(email: string): Promise<User | null> {
    return this.createQueryBuilder().where(`email = :email`, {email: email}).getOne();
  }
}