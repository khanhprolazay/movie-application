import { Body, Controller, Get, Inject, OnModuleInit, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { Pattern, Service, User } from "@app/shared";
import { UserService } from "./user.service";
import { JwtGuard } from "../auth/guard";
import { GetUser } from "../decorator";
import { UpdatePasswordDTO, UpdateUserDTO } from "@app/shared/dto/user.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("user")
@ApiTags("User")
@ApiBearerAuth()
export class UserController implements OnModuleInit {
  constructor(
    @Inject(Service.USER)
    private readonly userClient: ClientKafka,
    private readonly userService: UserService,
  ) {}

  async onModuleInit() {
    const patterns: Pattern[] = ["USER.GET_BY_ID", "USER.UPDATE", "USER.UPDATE_PASSWORD"];
    patterns.forEach(pattern => this.userClient.subscribeToResponseOf(pattern))
    await this.userClient.connect();
  }

  // Get user for role USER
  @Get()
  @UseGuards(JwtGuard)
  async getUser(@GetUser() user: User) {
    return user;
  } 

  @Post()
  @UseGuards(JwtGuard)
  async updateUser(@Body() dto: UpdateUserDTO, @GetUser('id') id: number) {
    return await this.userService.update(id, dto);
  }

  @Post("password")
  @UseGuards(JwtGuard)
  async updatePassword(@Body() dto: UpdatePasswordDTO, @GetUser('id') id: number) {
    return await this.userService.updatePassword(id, dto);
  }

  // Get user by id for role ADMIN
  @Get(":id")
  @UseGuards(JwtGuard)
  async getUserById(@Param("id", ParseIntPipe) id: number) {
    return await this.userService.getById(id);
  } 
}