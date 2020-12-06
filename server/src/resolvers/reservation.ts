import { Reservation } from "../entities/Reservation";
import { MyContext } from "../types";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class ReservationResolver {
    @Query(() => [Reservation])
    reservations(@Ctx() { em }: MyContext): Promise<Reservation[]> {
        return em.find(Reservation, {})
    }
}