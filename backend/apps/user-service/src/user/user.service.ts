import { verify } from 'argon2';
import { UserRepository } from './user.repository';
import { RoleService } from '../role/role.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { BaseService, UserEntity, LoggerService, LoginRequestDto, RegisterRequestDto, Role } from '@app/shared';

@Injectable()
export class UserService extends BaseService<UserEntity, UserRepository> {
  constructor(
    protected readonly roleService: RoleService,
    protected readonly repository: UserRepository,
    protected readonly loggerService: LoggerService,
    
  ) {
    super(repository, loggerService);
  }

  async checkByEmail(email: string) {
    const user = await this.repository.getByEmail(email);
    return user ? true : false;
  }

  async getUserByEmailAndPassword({email, password}: LoginRequestDto) {
    const user = await this.repository.getByEmail(email);

    if (!user) {
      throw new ForbiddenException('Account does not exist !!!');
    }

    const matched = await verify(user.password, password);
    if (!matched) {
      throw new ForbiddenException('Incorrect password !!!');
    }

    return user;
  }

  async createUser(dto: RegisterRequestDto) {
    const role = await this.roleService.getByName(Role.USER);
    
    const user = new UserEntity();
    Object.assign(user, dto);
    user.role = role;
    return await this.repository.save(user);
  }
}
