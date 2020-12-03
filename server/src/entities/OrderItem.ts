import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { MenuItem } from "./MenuItem";
import { Order } from "./Order";

@Entity()
export class OrderItem {
  @PrimaryKey()
  id!: number;
  
  @Property()
  order_id!: number
  
  @Property()
  menu_item_id!: number
  
  @Property()
  price!: number;
  
  @Property()
  amount!: number;

  @OneToMany(() => Order, order => order.order_id)
  orders = new Collection<Order>(this)

  @OneToMany({entity: () => MenuItem, mappedBy: "menu_item_id"})
  menuItems = new Collection<MenuItem>(this)
}