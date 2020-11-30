import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Reservation {

  @PrimaryKey()
  id!: number;

  @Property()
  booking_id!: number;

  @Property()
  date_and_time = new Date();

  @Property()
  no_persons!: number;

  @Property()
  table_id!: number;

}