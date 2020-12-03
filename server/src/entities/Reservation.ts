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
  
  @ManyToOne(() => Booking)
  booking_id!: Booking;

  @ManyToOne()
  table_id!: Table;

  @OneToMany(() => Order, order => order.reservation_id)
  orders = new Collection<Booking>(this)
}