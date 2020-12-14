import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { Reservation } from "./Reservation";

@ObjectType()
@Entity()
export class Booking extends BaseEntity{

    @Field()
    @PrimaryColumn({primary: true, default:55, generated: true })
    id: number;
    
    @Field(() => String)
    @CreateDateColumn()
    startDate: Date;
    
    @Field(() => String)
    @CreateDateColumn()
    endDate: Date;

    @Field()
    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.bookings)
    user: User 

    @OneToMany(() => Reservation, reservation => reservation.booking)
    reservations: Reservation[]
}