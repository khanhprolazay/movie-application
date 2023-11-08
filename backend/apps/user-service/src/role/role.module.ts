import { Module } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { RoleRepository } from "./role.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role, Service } from "@app/shared";

@Module({
  imports: [TypeOrmModule.forFeature([Role], Service.USER)],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  exports: [RoleService]
})
export class RoleModule {}