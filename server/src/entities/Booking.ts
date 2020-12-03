import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Reservation } from "./Reservation";
import { User } from "./User";

@Entity()
export class Booking {
    @PrimaryKey()
    id!: number;
    
    @Property()
    start_date: string;
    
    @Property()
    end_date: string;
    
    @OneToMany(() => Reservation, reservation => reservation.booking_id)
    reservations = new Collection<Reservation>(this)

    @ManyToOne(() => User)
    user_id!: User
}