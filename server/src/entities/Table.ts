import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

type max_persons = {
    small_table: number; // 2 people
    medium_table: number; // 4 people
    large_table: number; // 8 people
}

@Entity()
export class Table {

  @PrimaryKey()
  id!: number;

  @Property()
  max_persons!: max_persons;

}