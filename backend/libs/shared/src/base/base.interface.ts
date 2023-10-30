import { DeepPartial, DeleteResult } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface IBaseService<T> {
  getById(id: EntityId): Promise<T>,
  create(data: DeepPartial<T>): Promise<T>,
  update(id: EntityId, data: QueryDeepPartialEntity<T>): Promise<T>,
  delete(id: EntityId): Promise<DeleteResult>,
}