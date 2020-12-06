import { Cascade, Collection, DateType, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Reservation } from "./Reservation";
import { User } from "./User";

@ObjectType()
@Entity()
export class Booking {

    @Field()
    @PrimaryKey()
    id!: number;
    
    @Field(() => String)
    @Property({type: DateType})
    start_date: Date;
    
    @Field(() => String)
    @Property({type: DateType})
    end_date: Date;
    
    @Field(() => [User])
    @ManyToOne(() => User, { primary: true })
    user!: User
    
    @Field(() => [Reservation])
    @OneToMany(() => Reservation, reservation => reservation.booking, {cascade: [Cascade.ALL]})
    reservations = new Collection<Reservation>(this)
}