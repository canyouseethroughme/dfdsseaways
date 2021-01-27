import { OrderItem } from "../entities/OrderItem";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class OrderItemResolver {
  @Query(() => [OrderItem])
  async orderItems(): Promise<OrderItem[]> {
    return OrderItem.find();
  }

  @Query(() => OrderItem, { nullable: true })
  orderItem(@Arg("orderId") orderId: number): Promise<OrderItem | undefined> {
    return OrderItem.findOne(orderId);
  }

  @Mutation(() => [OrderItem])
  async createOrderItems(
    @Arg("orderItems", () => [OrderItem]) orderItems: OrderItem[]
  ): Promise<OrderItem[]> {
    const orderCreations = orderItems.map(
      ({ orderId, menuItemId, amount, price }) =>
        OrderItem.create({ orderId, menuItemId, amount, price }).save()
    );
    return Promise.all(orderCreations);
  }

  @Mutation(() => OrderItem)
  async createOrderItem(
    @Arg("orderId") orderId: number,
    @Arg("menuItemId") menuItemId: number,
    @Arg("amount") amount: number,
    @Arg("price") price: number
  ): Promise<OrderItem> {
    return OrderItem.create({ orderId, menuItemId, amount, price }).save();
  }

  @Mutation(() => OrderItem, { nullable: true })
  async updateOrderItem(
    @Arg("orderId") orderId: number,
    @Arg("menuItemId") menuItemId: number,
    @Arg("amount") amount: number
  ): Promise<OrderItem | null> {
    const orderItem = await OrderItem.findOne(orderId);
    if (!orderItem) {
      return null;
    }

    if (typeof orderItem !== "undefined") {
      OrderItem.update({ orderId }, { menuItemId, amount });
    }
    return orderItem;
  }

  @Mutation(() => Boolean)
  async deleteOrderItem(@Arg("orderId") orderId: number): Promise<boolean> {
    await OrderItem.delete(orderId);
    return true;
  }
}
