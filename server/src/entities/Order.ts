import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { OrderItem } from "./OrderItem";
import { Reservation } from "./Reservation";

@Entity()
export class Order {
  @PrimaryKey()
  id!: number;
  
  @ManyToOne(() => Reservation)
  reservation_id!: Reservation;

  @ManyToOne()
  order_id: OrderItem

  @Property()
  menu_item_id!: number;
}