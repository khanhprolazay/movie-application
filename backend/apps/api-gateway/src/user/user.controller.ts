import { Body, Controller, Get, Inject, Param, ParseIntPipe, Put, UseGuards } from "@nestjs/common";
import { Service, User } from "@app/shared";
import { UserService } from "./user.service";
import { JwtGuard } from "../auth/guard";
import { GetUser } from "../decorator";
import { UpdatePasswordDTO, UpdateUserDTO } from "@app/shared/dto/user.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("user")
@ApiTags("User")
@ApiBearerAuth()
export class UserController {
  constructor( private readonly userService: UserService ) {}

  // Get user for role USER
  @Get()
  @UseGuards(JwtGuard)
  getUser(@GetUser() user: User) {
    return user;
  } 

  @Put()
  @UseGuards(JwtGuard)
  updateUser(@Body() dto: UpdateUserDTO, @GetUser('id') id: number) {
    return this.userService.update(id, dto);
  }

  @Put("password")
  @UseGuards(JwtGuard)
  updatePassword(@Body() dto: UpdatePasswordDTO, @GetUser('id') id: number) {
    return this.userService.updatePassword(id, dto);
  }

  // Get user by id for role ADMIN
  @Get(":id")
  @UseGuards(JwtGuard)
  getUserById(@Param("id", ParseIntPipe) id: number) {
    return this.userService.getById(id);
  } 
}