import { Reservation } from "../entities/Reservation";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";

@Resolver()
export class ReservationResolver {
    @Query(() => [Reservation])
    async reservations(
        @Ctx() {req}: MyContext
    ): Promise<Reservation[]> {
        return Reservation.find({where: {bookingId: req.session.bookingId}})
    }

    @Query(() => Reservation, {nullable: true})
    reservation(
        @Arg('id') id: number,
        @Ctx() { req }: MyContext
     ): Promise<Reservation | undefined> {
        return Reservation.findOne(id, {where: {bookingId: req.session.bookingId}})
    }

    @Mutation(() => Reservation)
    async createReservation(
        @Arg('dateAndTime') dateAndTime: Date, 
        @Arg('noPersons') noPersons: number, 
        @Arg('tableId') tableId: number,
        @Ctx() { req }: MyContext
    ): Promise<Reservation>{
        return Reservation.create({dateAndTime, noPersons, bookingId: req.session.bookingId, tableId}).save()
    }

    @Mutation(() => Reservation, {nullable: true})
    async updateReservation(
        @Arg('id') id: number, 
        @Arg('dateAndTime') dateAndTime: Date, 
        @Arg('noPersons') noPersons: number, 
        @Arg('tableId') tableId: number,
        @Ctx() { req }: MyContext
        ): Promise<Reservation | null> {
        const reservation = await Reservation.findOne(id)
       
        if(!reservation) {return null}

        if( typeof reservation !== 'undefined'){
             Reservation.update({id}, {dateAndTime, noPersons, bookingId: req.session.bookingId, tableId})
        }
        return reservation;
    }

    @Mutation(() => Boolean)
    async deleteReservation(@Arg('id') id: number): Promise<boolean> {
        await Reservation.delete(id)
        return true
    }
}