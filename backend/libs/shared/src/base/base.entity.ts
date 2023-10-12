import { instanceToPlain } from "class-transformer";
import { BaseEntity as TypeOrmBaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn('increment', {type: 'int'})
  id: number

  @CreateDateColumn({type: 'timestamp', name: 'created_at'})
  createdAt: Date

  @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
  updatedAt: Date

  @DeleteDateColumn({type: 'timestamp', name: 'deleted_at'})
  deletedAt: Date

  // When Nestjs Kafka outcome the message, It firstly try "stringifies" the entity class
  // We need to implement toString method to exclude all the attribute has @Exclude decorator
  toString() {
    return JSON.stringify(
      instanceToPlain(this)
    );
  }
}
