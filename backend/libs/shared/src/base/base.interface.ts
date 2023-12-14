import { DeepPartial, DeleteResult } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Observable } from 'rxjs';

export interface IBaseService<T> {
  getById(id: EntityId): Promise<T> | Observable<T>,
  create(data: DeepPartial<T>): Promise<T> | Observable<T>,
  update(id: EntityId, data: QueryDeepPartialEntity<T>): Promise<T> | Observable<T>,
  delete(id: EntityId): Promise<DeleteResult> | Observable<DeleteResult>,
}