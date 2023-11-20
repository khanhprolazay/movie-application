import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginRequestDto, PatternOption, RegisterGoogleRequestDto, RegisterRequestDto, User } from '@app/shared';
import { Payload, MessagePattern } from '@nestjs/microservices';
import { UpdatePasswordDTO } from '@app/shared/dto/user.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';


@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(PatternOption['USER.CHECK.BY_EMAIL'])
  checkByEmail(@Payload() email: string) {
    return this.userService.checkByEmail(email);
  } 

  @MessagePattern(PatternOption['USER.GET.BY_ID'])
  getById(@Payload() id: number) {
    return this.userService.getById(id);
  } 

  @MessagePattern(PatternOption['USER.CREATE'])
  createUser(@Payload() dto: RegisterRequestDto) {
    return this.userService.createUser(dto);
  }

  @MessagePattern(PatternOption['USER.UPDATE'])
  updateUser(@Payload() dto: { id: number, data: QueryDeepPartialEntity<User>}) {
    return this.userService.update(dto.id, dto.data);
  }

  @MessagePattern(PatternOption['USER.GET.BY_EMAIL_AND_PASSWORD'])
  getByEmailAndPassword(@Payload() dto: LoginRequestDto) {
    return this.userService.getUserByEmailAndPassword(dto);  
  }

  @MessagePattern(PatternOption['USER.GET.BY_EMAIL'])
  getByEmail(@Payload() email: string) {
    return this.userService.getByEmail(email);
  }

  @MessagePattern(PatternOption['USER.CREATE.BY_GOOGLE'])
  createGoogleUser(@Payload() dto: RegisterGoogleRequestDto) {
    return this.userService.createGoogleUser(dto);
  }

  @MessagePattern(PatternOption['USER.UPDATE.PASSWORD'])
  updatePassword(@Payload() dto: { id: number, data: UpdatePasswordDTO}) {
    return this.userService.updatePassword(dto);
  }
}
