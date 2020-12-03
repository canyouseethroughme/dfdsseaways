import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class MenuItem {
  
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  description!: string;

  @Property()
  type!: 1 | 2 | 3 | 4 | 5 | 6 // 1: starter | 2: main_course | 3: side_orders | 4: desert | 5: alcoholic | 6: nonalcoholic

  @Property()
  price!: number;

  @Property()
  item_type!: 1 | 2; // 1 food | 2 drink

}