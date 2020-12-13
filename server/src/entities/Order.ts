import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./OrderItem";
import { Reservation } from "./Reservation";

@ObjectType()
@Entity()
export class Order extends BaseEntity{
  
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  reservationId: number

  @ManyToOne(() => Reservation, reservation => reservation.id)
  reservation: Reservation

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  orderItems: OrderItem[]
}