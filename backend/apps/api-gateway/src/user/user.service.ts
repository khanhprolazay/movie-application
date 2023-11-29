import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { PatternOption, Service, User } from "@app/shared";
import { BaseMessageService } from "../base";
import { UpdatePasswordDTO } from "@app/shared/dto/user.dto";

@Injectable()
export class UserService extends BaseMessageService<User> {
  constructor(
    @Inject(Service.USER)
    protected readonly userClient: ClientProxy
  ) {
    super(userClient, "USER");
  }

  async updatePassword(id: number, dto: UpdatePasswordDTO) {
    await this.excuteEmpty(PatternOption["USER.UPDATE.PASSWORD"], { id, data: dto });
    return null;
  }  
}