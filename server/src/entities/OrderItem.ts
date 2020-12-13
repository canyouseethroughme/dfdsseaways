import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { MenuItem } from "./MenuItem";
import { Order } from "./Order";
@ObjectType()
@Entity()
export class OrderItem extends BaseEntity {

  @PrimaryColumn()
  orderId: number;

  @PrimaryColumn()
  menuItemId: number

  @Field(() => Int)
  @Column()
  price: number;
  
  @Field(() => Int)
  @Column()
  amount: number;

  @ManyToOne(() => Order, order => order.id)
  order: Order

  @ManyToOne(() => MenuItem, menuItem => menuItem.id)
  menuItem: MenuItem
}