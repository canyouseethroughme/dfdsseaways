import { OrderItem } from "../entities/OrderItem";
import { MyContext } from "../types";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class OrderItemResolver {
    @Query(() => [OrderItem])
    orderItems(@Ctx() { em }: MyContext): Promise<OrderItem[]> {
        return em.find(OrderItem, {})
    }
}