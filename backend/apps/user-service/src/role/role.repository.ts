import { Injectable } from "@nestjs/common";
import { Role, RoleEnum } from "@app/shared";
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(private dataSource: DataSource ) {
    super(Role, dataSource.createEntityManager());
  }

  async getByName(name: RoleEnum) {
    return await this.createQueryBuilder().where(`name= :name`, { name }).getOne();
  }
}