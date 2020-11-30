import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Order {

  @PrimaryKey()
  id!: number;

  @Property()
  reservation_id!: number;

  @Property()
  menu_item_id!: number;

}