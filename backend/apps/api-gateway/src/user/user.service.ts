import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { Service, UserEntity } from "@app/shared";
import { BaseMessageService } from "../base";

@Injectable()
export class UserService extends BaseMessageService<UserEntity> {
  constructor(
    @Inject(Service.USER)
    protected readonly userClient: ClientKafka
  ) {
    super(userClient, "USER");
  }
}