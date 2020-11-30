import { Entity, Property } from "@mikro-orm/core";

@Entity()
export class OrderItem {

  @Property()
  order_id!: number;

  @Property()
  menu_item_id!: number;

  @Property()
  price!: number;

  @Property()
  amount!: number;

}