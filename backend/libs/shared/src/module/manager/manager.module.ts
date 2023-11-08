import { Module } from "@nestjs/common";
import { ManagerService } from "./manager.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KafkaGroup } from "@app/shared/entity/kafka-group.entity";

@Module({
  imports: [TypeOrmModule.forFeature([KafkaGroup], 'manager')],
  providers: [ManagerService],
  exports: [ManagerService]
})
export class ManagerModule {}