import { Booking } from "../entities/Booking";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class BookingResolver {
    @Query(() => [Booking])
    async bookings(): Promise<Booking[]> {
       return Booking.find()
    }

    @Query(() => Booking, {nullable: true})
    booking(@Arg("id") id: number): Promise<Booking | undefined>{
        return Booking.findOne(id)
    }
}