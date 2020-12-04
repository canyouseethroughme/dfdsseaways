import { Collection, DateType, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Reservation } from "./Reservation";
import { User } from "./User";

@Entity()
export class Booking {

    @PrimaryKey()
    id!: number;
    
    @Property({type: DateType})
    start_date: Date;
    
    @Property({type: DateType})
    end_date: Date;
    
    @ManyToOne(() => User, { primary: true })
    user!: User
    
    @OneToMany(() => Reservation, reservation => reservation.booking)
    reservations = new Collection<Reservation>(this)
}