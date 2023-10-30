import { BaseService, LoggerService, Role, RoleEntity } from "@app/shared";
import { RoleRepository } from "./role.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RoleService extends BaseService<RoleEntity, RoleRepository> {
  constructor(
    protected readonly repository: RoleRepository,
    protected readonly loggerService: LoggerService,
  )  {
    super(repository, loggerService)
  }

  async getByName(name: Role) {
    const role = await this.repository.getByName(name);
    return role ? role : await this.create({ name: name });
  }
}