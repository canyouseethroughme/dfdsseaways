import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Reservation } from "./Reservation";

@Entity()
export class Table {
  
  @PrimaryKey()
  id!: number;

  @Property()
  max_persons!: 2 | 4 | 8; // 2: small_table | 4: medium_table | 8: large_table

  @OneToMany(() => Reservation, Reservation => Reservation.table)
  reservations = new Collection<Reservation>(this)
}