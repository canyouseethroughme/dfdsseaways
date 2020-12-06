import { Migration } from '@mikro-orm/migrations';

export class Migration20201206154424 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "menu_item" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null, "type" int4 not null, "price" int4 not null, "item_type" int4 not null);');

    this.addSql('create table "table" ("id" serial primary key, "max_persons" int4 not null);');

    this.addSql('create table "user" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null);');

    this.addSql('create table "booking" ("id" int4 not null, "user_id" int4 not null, "start_date" date not null, "end_date" date not null);');
    this.addSql('alter table "booking" add constraint "booking_pkey" primary key ("id", "user_id");');

    this.addSql('create table "reservation" ("id" int4 not null, "booking_id" int4 not null, "booking_user_id" int4 not null, "table_id" int4 not null, "date_and_time" jsonb not null, "no_persons" int4 not null);');
    this.addSql('alter table "reservation" add constraint "reservation_pkey" primary key ("id", "booking_id", "booking_user_id", "table_id");');

    this.addSql('create table "order" ("id" int4 not null, "reservation_id" int4 not null, "reservation_booking_id" int4 not null, "reservation_booking_user_id" int4 not null, "menu_item_id" int4 not null, "reservation_table_id" int4 not null);');
    this.addSql('alter table "order" add constraint "order_pkey" primary key ("id", "reservation_id", "reservation_booking_id", "reservation_booking_user_id", "reservation_table_id");');

    this.addSql('create table "order_item" ("order_id" int4 not null, "order_reservation_id" int4 not null, "menu_item_id" int4 not null, "price" int4 not null, "amount" int4 not null, "order_reservation_booking_id" int4 not null, "order_reservation_booking_user_id" int4 not null, "order_reservation_table_id" int4 not null);');
    this.addSql('alter table "order_item" add constraint "order_item_pkey" primary key ("order_id", "order_reservation_id", "order_reservation_booking_id", "order_reservation_booking_user_id", "order_reservation_table_id", "menu_item_id");');

    this.addSql('alter table "booking" add constraint "booking_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "reservation" add constraint "reservation_booking_id_booking_user_id_foreign" foreign key ("booking_id", "booking_user_id") references "booking" ("id", "user_id") on update cascade;');
    this.addSql('alter table "reservation" add constraint "reservation_table_id_foreign" foreign key ("table_id") references "table" ("id") on update cascade;');

    this.addSql('alter table "order" add constraint "order_reservation_id_reservation_booking_id_reservation_booking_user_id_reservation_table_id_foreign" foreign key ("reservation_id", "reservation_booking_id", "reservation_booking_user_id", "reservation_table_id") references "reservation" ("id", "booking_id", "booking_user_id", "table_id") on update cascade;');

    this.addSql('alter table "order_item" add constraint "order_item_order_id_order_reservation_id_order_reservation_booking_id_order_reservation_booking_user_id_order_reservation_table_id_foreign" foreign key ("order_id", "order_reservation_id", "order_reservation_booking_id", "order_reservation_booking_user_id", "order_reservation_table_id") references "order" ("id", "reservation_id", "reservation_booking_id", "reservation_booking_user_id", "reservation_table_id") on update cascade;');
    this.addSql('alter table "order_item" add constraint "order_item_menu_item_id_foreign" foreign key ("menu_item_id") references "menu_item" ("id") on update cascade;');

    this.addSql('create index "reservation_booking_id_booking_user_id_index" on "reservation" ("booking_id", "booking_user_id");');

    this.addSql('create index "order_reservation_id_reservation_booking_id_reservation_booking_user_id_reservation_table_id_index" on "order" ("reservation_id", "reservation_booking_id", "reservation_booking_user_id", "reservation_table_id");');

    this.addSql('create index "order_item_order_id_order_reservation_id_order_reservation_booking_id_order_reservation_booking_user_id_order_reservation_table_id_index" on "order_item" ("order_id", "order_reservation_id", "order_reservation_booking_id", "order_reservation_booking_user_id", "order_reservation_table_id");');
  }

}
