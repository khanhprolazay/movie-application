import { Injectable } from "@nestjs/common";
import { Role, RoleEntity } from "@app/shared";
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
  constructor(private dataSource: DataSource ) {
    super(RoleEntity, dataSource.createEntityManager());
  }

  async getByName(name: Role) {
    return await this.createQueryBuilder().where(`name= :name`, {name: name}).getOne();
  }
}