import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Booking } from "./Booking";

@Entity()
export class User {
  
  @PrimaryKey()
  id: number;

  @Property()
  first_name!: string

  @Property()
  last_name!: string;

  @OneToMany(() => Booking, booking => booking.user)
  bookings = new Collection<Booking>(this);
}
