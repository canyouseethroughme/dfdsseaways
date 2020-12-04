import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Reservation } from "./Reservation";


@Entity()
export class Order {
  
  @PrimaryKey()
  id!: number;
  
  @Property()
  menu_item_id!: number;

  @Property()
  reservation_table_id!: number;
  
  @ManyToOne(() => Reservation, {primary: true})
  reservation!: Reservation
}