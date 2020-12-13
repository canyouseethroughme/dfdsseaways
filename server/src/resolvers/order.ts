import { Order } from "../entities/Order";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class OrderResolver {
    @Query(() => [Order])
    async orders(): Promise<Order[]> {
       return Order.find()
    }

    @Query(() => Order, {nullable: true})
    async order(@Arg('id') id: number): Promise<Order | undefined>{
        return Order.findOne(id)
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