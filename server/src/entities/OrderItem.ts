import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { MenuItem } from "./MenuItem";
import { Order } from "./Order";

@Entity()
export class OrderItem {

  @Property()
  price!: number;
  
  @Property()
  amount!: number;

  @ManyToOne({primary: true})
  order: Order

  @ManyToOne({ primary: true })
  menu_item: MenuItem
}