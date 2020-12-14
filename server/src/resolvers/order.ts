import { Order } from "../entities/Order";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class OrderResolver {

    @Query(() => [Order])
    async orders(
        @Arg('reservationId') reservationId: number
    ): Promise<Order[]> {
       return Order.find({where: {reservationId}})
    }

    @Mutation(() => Order)
    async createOrder(@Arg('reservationId') reservationId: number): Promise<Order>{
        return Order.create({reservationId}).save()
    }

    @Mutation(() => Boolean)
    async deleteOrder(@Arg('reservationId') reservationId: number): Promise<boolean>{
        await Order.delete(reservationId)
        return true
    }
}