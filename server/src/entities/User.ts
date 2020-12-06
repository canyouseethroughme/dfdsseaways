import { Cascade, Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Booking } from "./Booking";

@ObjectType()
@Entity()
export class User {
  
  @Field()
  @PrimaryKey()
  id: number;

  @Field(() => String)
  @Property()
  first_name!: string

  @Field(() => String)
  @Property()
  last_name!: string;

  @Field(() => [Booking])
  @OneToMany(() => Booking, booking => booking.user, {cascade: [Cascade.ALL]})
  bookings = new Collection<Booking>(this);
}
