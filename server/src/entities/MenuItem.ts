import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderItem } from "./OrderItem";

@ObjectType()
@Entity()
export class MenuItem extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @Column()
  description!: string;

  @Field(() => String)
  @Column()
  category:
    | "starter"
    | "main_course"
    | "side_orders"
    | "desert"
    | "alcoholic"
    | "nonalcoholic";

  @Field(() => Int)
  @Column()
  price!: number;

  @Field(() => String)
  @Column()
  itemType: "food" | "drink";

  @OneToMany(() => OrderItem, (orderItem) => orderItem.menuItemId)
  orderItems: OrderItem[];
}
