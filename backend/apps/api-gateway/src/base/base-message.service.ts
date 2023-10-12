import { firstValueFrom } from 'rxjs';
import { DeepPartial, DeleteResult } from 'typeorm';
import { ClientKafka } from "@nestjs/microservices";
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity, BasePattern, IBaseService, BaseAction, EntityKeyUnion, Pattern } from "@app/shared";

export class BaseMessageService<E extends BaseEntity> implements IBaseService<E> {
  constructor( 
    protected readonly client: ClientKafka,
    protected readonly key: EntityKeyUnion,
  ) {}

  private async execute(pattern: BasePattern<EntityKeyUnion>, payload: any) {
    return await firstValueFrom(
      this.client.send<E>(pattern, payload)
    )
  }

  protected async executeMany<T = E>(pattern: Pattern, payload: any) {
    return await firstValueFrom(
      this.client.send<T[]>(pattern, payload)
    )
  }

  getById(id: number) {
    return this.execute(`${this.key}.${BaseAction.GET_BY_ID}`, id);
  }

  create(data: DeepPartial<E>) {
    return this.execute(`${this.key}.${BaseAction.CREATE}`, data);
  }

  update(id: number, data: QueryDeepPartialEntity<E>) {
    return this.execute(`${this.key}.${BaseAction.UPDATE}`, data);
  }

  async delete(id: number) {
    return await firstValueFrom(
      this.client.send<DeleteResult>(`${this.key}.${BaseAction.DELETE}`, id)
    )
  }
}