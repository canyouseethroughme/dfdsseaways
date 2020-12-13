import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./OrderItem";

@ObjectType()
@Entity()
export class MenuItem extends BaseEntity{
  
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @Column()
  description!: string;

  @Field(() => Int)
  @Column()
  type!: 1 | 2 | 3 | 4 | 5 | 6 // 1: starter | 2: main_course | 3: side_orders | 4: desert | 5: alcoholic | 6: nonalcoholic

  @Field(() => Int)
  @Column()
  price!: number;

  @Field(() => Int)
  @Column()
  itemType!: 1 | 2; // 1: food | 2: drink

  @OneToMany(() => OrderItem, orderItem => orderItem.menuItemId)
  orderItems: OrderItem[]

}