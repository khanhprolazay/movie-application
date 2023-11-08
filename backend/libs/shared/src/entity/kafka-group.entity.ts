import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base";

@Entity({name: 'kafka_group'})
export class KafkaGroup extends BaseEntity {
  @Column()
  name: string;

  @Column()
  sauce: string;

  @Column()
  isUsed: boolean;
}