import { Migration } from '@mikro-orm/migrations';

export class Migration20230531060232_Season_Drop_Description extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "seasons" drop column "description";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "seasons" add column "description" varchar not null default null;');
  }

}
