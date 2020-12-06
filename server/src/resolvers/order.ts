import { Order } from "../entities/Order";
import { MyContext } from "../types";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class OrderResolver {
    @Query(() => [Order])
    orders(@Ctx() { em }: MyContext): Promise<Order[]> {
        return em.find(Order, {})
    }
}