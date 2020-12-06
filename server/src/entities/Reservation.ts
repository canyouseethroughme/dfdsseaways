import { Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Booking } from "./Booking";
import { Order } from "./Order";
import { Table } from "./Table";

@ObjectType()
@Entity()
export class Reservation {
  
  @Field(() => Int)
  @PrimaryKey()
  id!: number;
  
  @Field(() => String)
  @Property()
  date_and_time = new Date();
  
  @Field(() => Int)
  @Property()
  no_persons!: number;

  @Field(() => [Booking])
  @ManyToOne(() => Booking, {primary: true})
  booking: Booking
  
  @Field(() => [Table])
  @ManyToOne(() => Table, {primary: true})
  table: Table;
  
  @Field(() => [Order])
  @OneToMany(() => Order, order => order.reservation, {cascade: [Cascade.ALL]})
  orders = new Collection<Order>(this)
}