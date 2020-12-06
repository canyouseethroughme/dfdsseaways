import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Reservation } from "./Reservation";

@ObjectType()
@Entity()
export class Order {
  
  @Field()
  @PrimaryKey()
  id!: number;
  
  @Field(() => Int)
  @Property()
  menu_item_id!: number;

  @Field(() => Int)
  @Property()
  reservation_table_id!: number;
  
  @Field(() => [Reservation])
  @ManyToOne(() => Reservation, {primary: true})
  reservation!: Reservation
}