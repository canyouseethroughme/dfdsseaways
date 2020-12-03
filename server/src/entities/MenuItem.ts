import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { OrderItem } from "./OrderItem";

type type = {
    starter: boolean;
    main_course: boolean;
    desert: boolean;
    alcoholic: boolean;
    nonalcoholic: boolean;
}

type item_type = {
    drink: boolean;
    food: boolean;
}

@Entity()
export class MenuItem {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  type!: type

  @Property()
  price!: number;

  @Property()
  item_type!: item_type;

  @ManyToOne(() => OrderItem)
  menu_item_id!: OrderItem;
}