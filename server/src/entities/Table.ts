import { Cascade, Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Reservation } from "./Reservation";

@ObjectType()
@Entity()
export class Table {
  
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => Int)
  @Property()
  max_persons!: 2 | 4 | 8; // 2: small_table | 4: medium_table | 8: large_table

  @Field(() => [Reservation])
  @OneToMany(() => Reservation, reservation => reservation.table, {cascade: [Cascade.ALL]})
  reservations = new Collection<Reservation>(this)
}