import { Field, InputType, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { MenuItem } from "./MenuItem";
import { Order } from "./Order";
@ObjectType()
@Entity()
@InputType("OrderItemInput")
export class OrderItem extends BaseEntity {
  @Field()
  @PrimaryColumn()
  orderId: number;

  @Field()
  @PrimaryColumn()
  menuItemId: number;

  @Field(() => Int)
  @Column()
  price: number;

  @Field(() => Int)
  @Column()
  amount: number;

  @ManyToOne(() => Order, (order) => order.id, { onDelete: "CASCADE" })
  order: Order;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.id)
  menuItem: MenuItem;
}
