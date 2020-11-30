import { Migration } from '@mikro-orm/migrations';

export class Migration20201130143239 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null);');
  }

}
