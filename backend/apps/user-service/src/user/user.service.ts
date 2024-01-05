import { v4 } from 'uuid';
import { verify, hash } from 'argon2';
import { UserRepository } from './user.repository';
import { RoleService } from '../role/role.service';
import { ForbiddenException, Injectable, NotAcceptableException } from '@nestjs/common';
import { BaseService, User, LoggerService, LoginRequestDto, RegisterRequestDto, RoleEnum, RegisterGoogleRequestDto, UserLoginType } from '@app/shared';
import { UpdatePasswordDTO } from '@app/shared/dto/user.dto';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
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
    const role = await this.roleService.getByName(RoleEnum.USER);

    const user = new User();
    Object.assign(user, dto);
    user.role = role;
    user.password = await hash(user.password);
    
    return await this.repository.save(user);
  }

  async getByEmail(email: string) {
    return await this.repository.getByEmail(email);
  }

  async createGoogleUser(dto: RegisterGoogleRequestDto) {
    const role = await this.roleService.getByName(RoleEnum.USER);
    const user = new User();
    Object.assign(user, dto);

    user.password = v4();
    user.role = role;
    
    return await this.repository.save(user);
  }

  async updatePassword(dto: { id: number, data: UpdatePasswordDTO }) {
    const { id, data } = dto;
    const { oldPassword, newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword)
      throw new NotAcceptableException("Two new provided password must be the same !!!");

    const user = await this.repository.findOneBy({ id });

    if (user.loginType === UserLoginType.GOOGLE)
      throw new NotAcceptableException("Dont accept to change this account password !!!")

    const match = await verify(user.password, oldPassword)
    if (!match)
      throw new NotAcceptableException("Old password not correct !!!")

    await this.update(id, { password: await hash(newPassword) });
    return null;
  }
}
