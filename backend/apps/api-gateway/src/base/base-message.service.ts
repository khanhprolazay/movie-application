import { first, firstValueFrom } from 'rxjs';
import { DeepPartial, DeleteResult } from 'typeorm';
import { ClientProxy } from "@nestjs/microservices";
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity, IBaseService, BaseAction, EntityKeyUnion, Pattern } from "@app/shared";

export class BaseMessageService<E extends BaseEntity> implements IBaseService<E> {
  constructor( 
    private readonly client: ClientProxy,
    private readonly key: EntityKeyUnion,
  ) {}


  protected executeMany<T = E>(pattern: Pattern, payload: any) {
    return this.client.send<T[]>(pattern, payload);
  }

  protected execute<T = E>(pattenrn: Pattern, payload: any) {
    return this.client.send<T>(pattenrn, payload);
  }

  protected excuteEmpty(pattern: Pattern, payload: any) {
    return this.client.send<null>(pattern, payload);
  }

  getById(id: number) {
    return this.execute(`${this.key}.${BaseAction['GET.BY_ID']}`, id);
  }

  create(data: DeepPartial<E>) {
    return this.execute(`${this.key}.${BaseAction.CREATE}`, data);
  }

  update(id: number, data: QueryDeepPartialEntity<E>) {
    return this.execute(`${this.key}.${BaseAction.UPDATE}`, { id, data });
  }

  delete(id: number) {
    return this.execute<DeleteResult>(`${this.key}.${BaseAction.DELETE}`, id)
  }
}