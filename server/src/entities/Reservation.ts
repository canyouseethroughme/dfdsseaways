import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Booking } from "./Booking";
import { Order } from "./Order";
import { Table } from "./Table";

@ObjectType()
@Entity()
export class Reservation extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ type: "timestamp" })
  dateAndTime: Date;

  @Field(() => Int)
  @Column({ type: "int" })
  noPersons: number;

  @Field()
  @Column()
  bookingId: number;

  @Field()
  @Column()
  tableId: number;

  @ManyToOne(() => Booking, (booking) => booking.reservations)
  booking: Booking;

  @ManyToOne(() => Table, (table) => table.reservations)
  table: Table;

  @OneToMany(() => Order, (order) => order.reservation, { onDelete: "CASCADE" })
  orders: Order[];
}
