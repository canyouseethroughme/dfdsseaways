import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { MenuItem } from "./MenuItem";
import { Order } from "./Order";

@Entity()
export class OrderItem {

  @Property()
  price!: number;
  
  @Property()
  amount!: number;

  @Property()
  order_reservation_booking_id!: number;

  @Property()
  order_reservation_booking_user_id!: number;

  @Property()
  order_reservation_table_id!: number;

  @ManyToOne({primary: true})
  order: Order

  @ManyToOne({ primary: true })
  menu_item: MenuItem
}