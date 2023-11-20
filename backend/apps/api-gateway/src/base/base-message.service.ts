import { firstValueFrom } from 'rxjs';
import { DeepPartial, DeleteResult } from 'typeorm';
import { ClientProxy } from "@nestjs/microservices";
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity, IBaseService, BaseAction, EntityKeyUnion, Pattern } from "@app/shared";

export class BaseMessageService<E extends BaseEntity> implements IBaseService<E> {
  constructor( 
    private readonly client: ClientProxy,
    private readonly key: EntityKeyUnion,
  ) {}


  protected async executeMany<T = E>(pattern: Pattern, payload: any) {
    return await firstValueFrom(
      this.client.send<T[]>(pattern, payload)
    )
  }

  protected async execute<T = E>(pattenrn: Pattern, payload: any) {
    return await firstValueFrom(
      this.client.send<T>(pattenrn, payload)
    )
  }

  protected async excuteEmpty(pattern: Pattern, payload: any) {
    return await firstValueFrom(
      this.client.send<null>(pattern, payload)
    )
  }

  async getById(id: number) {
    return await this.execute(`${this.key}.${BaseAction['GET.BY_ID']}`, id);
  }

  async create(data: DeepPartial<E>) {
    return await this.execute(`${this.key}.${BaseAction.CREATE}`, data);
  }

  async update(id: number, data: QueryDeepPartialEntity<E>) {
    return await this.execute(`${this.key}.${BaseAction.UPDATE}`, { id, data });
  }

  async delete(id: number) {
    return await this.execute<DeleteResult>(`${this.key}.${BaseAction.DELETE}`, id)
  }
}