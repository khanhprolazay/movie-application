import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { PatternOption, Service, UserEntity } from "@app/shared";
import { BaseMessageService } from "../base";
import { UpdatePasswordDTO } from "@app/shared/dto/user.dto";

@Injectable()
export class UserService extends BaseMessageService<UserEntity> {
  constructor(
    @Inject(Service.USER)
    protected readonly userClient: ClientKafka
  ) {
    super(userClient, "USER");
  }

  async updatePassword(id: number, dto: UpdatePasswordDTO) {
    await this.excuteEmpty(PatternOption["USER.UPDATE_PASSWORD"], { id, data: dto });
    return null;
  }  
}