import { DeepPartial, DeleteResult, FindOptionsWhere, Repository } from "typeorm";
import { IBaseService } from "./base.interface";
import { BaseEntity } from "./base.entity";
import { LoggerService } from "@nestjs/common";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class BaseService<T extends BaseEntity, R extends Repository<T>> implements IBaseService<T> {
  constructor(
    protected readonly repository: R,
    protected readonly logger: LoggerService,
  ) {}
  
  getById(id: number): Promise<T> {
    return this.repository.findOneBy({ id: id } as FindOptionsWhere<T>);
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const instance = this.repository.create(data);
    return await this.repository.save(instance);
  }

  async update(id: number, data: QueryDeepPartialEntity<T>): Promise<T> {
    await this.repository.update(id, data);
    return await this.getById(id);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.repository.softDelete(id);
  }
}