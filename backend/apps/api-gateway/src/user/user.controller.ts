import { Controller, Get, Inject, OnModuleInit, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { Pattern, Service, UserEntity } from "@app/shared";
import { UserService } from "./user.service";
import { JwtGuard } from "../auth/guard";
import { User } from "../decorator";

@Controller("user")
export class UserController implements OnModuleInit {
  constructor(
    @Inject(Service.USER)
    private readonly userClient: ClientKafka,
    private readonly userService: UserService,
  ) {}

  async onModuleInit() {
    const patterns: Pattern[] = ["USER.GET_BY_ID"];
    patterns.forEach(pattern => this.userClient.subscribeToResponseOf(pattern))
    await this.userClient.connect();
  }

  // Get user for role USER
  @Get()
  @UseGuards(JwtGuard)
  async getUser(@User() user: UserEntity) {
    return user;
  } 

  // Get user by id for role ADMIN
  @Get(":id")
  @UseGuards(JwtGuard)
  async getUserById(@Param("id", ParseIntPipe) id: number) {
    return await this.userService.getById(id);
  } 
}