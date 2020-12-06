import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class MenuItem {
  
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property()
  name!: string;

  @Field(() => String)
  @Property()
  description!: string;

  @Field(() => Int)
  @Property()
  type!: 1 | 2 | 3 | 4 | 5 | 6 // 1: starter | 2: main_course | 3: side_orders | 4: desert | 5: alcoholic | 6: nonalcoholic

  @Field(() => Int)
  @Property()
  price!: number;

  @Field(() => Int)
  @Property()
  item_type!: 1 | 2; // 1 food | 2 drink

}