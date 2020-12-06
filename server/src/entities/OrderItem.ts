import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { MenuItem } from "./MenuItem";
import { Order } from "./Order";

@ObjectType()
@Entity()
export class OrderItem {

  @Field(() => Int)
  @Property()
  price!: number;
  
  @Field(() => Int)
  @Property()
  amount!: number;

  @Field(() => Int)
  @Property()
  order_reservation_booking_id!: number;

  @Field(() => Int)
  @Property()
  order_reservation_booking_user_id!: number;

  @Field(() => Int)
  @Property()
  order_reservation_table_id!: number;

  @Field(() => [Order])
  @ManyToOne({primary: true})
  order: Order

  @Field(() => [MenuItem])
  @ManyToOne({ primary: true })
  menu_item: MenuItem
}