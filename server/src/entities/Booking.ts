import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Booking {

    @PrimaryKey()
    id!: number;
  
    @Property()
    user_id!: number;
  
    @Property()
    start_date = new Date();
  
    @Property()
    end_date = new Date();
}