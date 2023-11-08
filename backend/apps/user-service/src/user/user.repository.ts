import { Injectable } from "@nestjs/common";
import { Service, User } from "@app/shared";
import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectDataSource(Service.USER) 
    private readonly dataSource: DataSource
   ) {
    super(User, dataSource.createEntityManager());
  }

  getByEmail(email: string): Promise<User | null> {
    return this.createQueryBuilder().where(`email = :email`, {email: email}).getOne();
  }
}