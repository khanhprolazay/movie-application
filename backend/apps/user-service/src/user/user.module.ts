import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserEntity } from '@app/shared';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), RoleModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
