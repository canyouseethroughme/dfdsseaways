import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Reservation } from "./Reservation";

type max_persons = {
    small_table: number; // 2 people
    medium_table: number; // 4 people
    large_table: number; // 8 people
}

@Entity()
export class Table {
  @PrimaryKey()
  id!: number;

  @Property()
  max_persons!: max_persons;

  @OneToMany(() => Reservation, reservation => reservation.table_id)
  reservations = new Collection<Reservation>(this)
}