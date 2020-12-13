import { Reservation } from "../entities/Reservation";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class ReservationResolver {
    @Query(() => [Reservation])
    async reservations(): Promise<Reservation[]> {
        return Reservation.find()
    }

    @Query(() => Reservation, {nullable: true})
    reservation(@Arg('id') id: number): Promise<Reservation | undefined>{
        return Reservation.findOne(id)
    }

    @Mutation(() => Reservation)
    async createReservation(@Arg('dateAndTime') dateAndTime: Date, @Arg('noPersons') noPersons: number, @Arg('bookingId') bookingId: number, @Arg('tableId') tableId: number ): Promise<Reservation>{
        return Reservation.create({dateAndTime, noPersons, bookingId, tableId}).save()
    }

    @Mutation(() => Reservation, {nullable: true})
    async updateReservation(@Arg('id') id: number, @Arg('dateAndTime') dateAndTime: Date, @Arg('noPersons') noPersons: number, @Arg('bookingId') bookingId: number, @Arg('tableId') tableId: number): Promise<Reservation | null> {
        const reservation = await Reservation.findOne(id)
       
        if(!reservation) {return null}

        if( typeof reservation !== 'undefined'){
             Reservation.update({id}, {dateAndTime, noPersons, bookingId, tableId})
        }
        return reservation;
    }

    @Mutation(() => Boolean)
    async deleteReservation(@Arg('id') id: number): Promise<boolean> {
        await Reservation.delete(id)
        return true
    }
}