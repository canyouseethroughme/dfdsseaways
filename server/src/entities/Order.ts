import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Reservation } from "./Reservation";


@Entity()
export class Order {
  
  @PrimaryKey()
  id!: number;
  
  @Property()
  menu_item!: number;
  
  @ManyToOne(() => Reservation)
  reservation!: Reservation
}