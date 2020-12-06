import { Booking } from "../entities/Booking";
import { MyContext } from "../types";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class BookingResolver {
    @Query(() => [Booking])
    bookings(@Ctx() { em }: MyContext): Promise<Booking[]> {
        return em.find(Booking, {})
    }
}