import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./Reservation";

@ObjectType()
@Entity()
export class Table extends BaseEntity {
  
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @Column()
  maxPersons: 2 | 4 | 8; // 2: small_table | 4: medium_table | 8: large_table

  @OneToMany(() => Reservation, reservation => reservation.table)
  reservations: Reservation[]
} 