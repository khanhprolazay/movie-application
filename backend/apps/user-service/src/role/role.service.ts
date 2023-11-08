import { BaseService, LoggerService, RoleEnum, Role } from "@app/shared";
import { RoleRepository } from "./role.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RoleService extends BaseService<Role, RoleRepository> {
  constructor(
    protected readonly repository: RoleRepository,
    protected readonly loggerService: LoggerService,
  )  {
    super(repository, loggerService)
  }

  async getByName(name: RoleEnum) {
    const role = await this.repository.getByName(name);
    return role ? role : await this.create({ name });
  }
}