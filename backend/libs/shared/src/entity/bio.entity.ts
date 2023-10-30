import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base";

@Entity({name: 'bio'})
export class BioEntity extends BaseEntity {
  @Column('text')
  content: string
}