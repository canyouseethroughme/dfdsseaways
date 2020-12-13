import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Booking } from "./Booking";

@ObjectType()
@Entity()
export class User extends BaseEntity{
  
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  firstName: string

  @Field(() => String)
  @Column()
  lastName: string;

  @OneToMany(() => Booking, booking => booking.user)
  bookings: Booking[]
}
