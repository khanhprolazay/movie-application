import { KafkaGroup } from "@app/shared/entity/kafka-group.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(KafkaGroup, 'manager')
    private readonly repository: Repository<KafkaGroup>
  ) {}

  
}