import { Migration } from '@mikro-orm/migrations';

export class Migration20201201192337 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "order_item" drop constraint if exists "order_item_order_id_check";');
    this.addSql('alter table "order_item" alter column "order_id" type int4 using ("order_id"::int4);');
    this.addSql('alter table "order_item" drop constraint if exists "order_item_menu_item_id_check";');
    this.addSql('alter table "order_item" alter column "menu_item_id" type int4 using ("menu_item_id"::int4);');

    this.addSql('alter table "booking" drop constraint if exists "booking_start_date_check";');
    this.addSql('alter table "booking" alter column "start_date" type varchar(255) using ("start_date"::varchar(255));');
    this.addSql('alter table "booking" drop constraint if exists "booking_end_date_check";');
    this.addSql('alter table "booking" alter column "end_date" type varchar(255) using ("end_date"::varchar(255));');
  }

}
