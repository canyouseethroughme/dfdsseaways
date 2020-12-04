import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Booking } from "./Booking";
import { Order } from "./Order";
import { Table } from "./Table";

@Entity()
export class Reservation {
  
  @PrimaryKey()
  id!: number;
  
  @Property()
  date_and_time = new Date();
  
  @Property()
  no_persons!: number;

  @ManyToOne(() => Booking, {primary: true})
  booking: Booking
  
  @ManyToOne(() => Table, {primary: true})
  table: Table;
  
  @OneToMany(() => Order, order => order.reservation)
  orders = new Collection<Order>(this)
}