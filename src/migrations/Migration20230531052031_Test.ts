import { Migration } from '@mikro-orm/migrations';

export class Migration20230531052031_Test extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "bets" drop constraint "bets_season_gameday_id_foreign";');

    this.addSql('drop table if exists "bets" cascade;');

    this.addSql('drop table if exists "seasons_gamedays" cascade;');

    this.addSql('alter table "accounts" alter column "password_hash" type varchar(255) using ("password_hash"::varchar(255));');
    this.addSql('alter table "accounts" alter column "password_hash" drop not null;');

    this.addSql('alter table "seasons" alter column "is_active" type varchar(255) using ("is_active"::varchar(255));');
    this.addSql('alter table "seasons" drop column "description";');

    this.addSql('alter table "payments" alter column "amount" type numeric(10,1) using ("amount"::numeric(10,1));');

    this.addSql('alter table "season_places" drop constraint "place_per_season_unique";');
    this.addSql('alter table "season_places" add constraint "place_per_season_unqiue" unique ("season_id", "place");');
  }

  async down(): Promise<void> {
    this.addSql('create table "bets" ("id" uuid not null default gen_random_uuid(), "points" int4 not null default null, "missed" int4 not null default null, "is_max" bool not null default false, "season_gameday_id" uuid not null default null, "account_id" uuid not null default null, constraint "bets_pkey" primary key ("id"));');
    this.addSql('alter table "bets" add constraint "bets_season_gameday_id_account_id_unique" unique ("season_gameday_id", "account_id");');

    this.addSql('create table "seasons_gamedays" ("id" uuid not null default gen_random_uuid(), "season_id" uuid not null default null, "gameday_id" uuid not null default null, "date_start" timestamptz null default null, "date_end" timestamptz null default null, constraint "seasons_gamedays_pkey" primary key ("id"));');
    this.addSql('alter table "seasons_gamedays" add constraint "seasons_gamedays_always_unique" unique ("season_id", "gameday_id");');

    this.addSql('alter table "bets" add constraint "bets_account_id_foreign" foreign key ("account_id") references "accounts" ("id") on update cascade on delete no action;');
    this.addSql('alter table "bets" add constraint "bets_season_gameday_id_foreign" foreign key ("season_gameday_id") references "seasons_gamedays" ("id") on update cascade on delete no action;');

    this.addSql('alter table "seasons_gamedays" add constraint "seasons_gamedays_gameday_id_foreign" foreign key ("gameday_id") references "gamedays" ("id") on update cascade on delete no action;');
    this.addSql('alter table "seasons_gamedays" add constraint "seasons_gamedays_season_id_foreign" foreign key ("season_id") references "seasons" ("id") on update cascade on delete no action;');

    this.addSql('alter table "accounts" alter column "password_hash" type varchar using ("password_hash"::varchar);');
    this.addSql('alter table "accounts" alter column "password_hash" set not null;');

    this.addSql('alter table "payments" alter column "amount" type numeric using ("amount"::numeric);');

    this.addSql('alter table "season_places" drop constraint "place_per_season_unqiue";');
    this.addSql('alter table "season_places" add constraint "place_per_season_unique" unique ("season_id", "place");');

    this.addSql('alter table "seasons" add column "description" varchar not null default null;');
    this.addSql('alter table "seasons" alter column "is_active" type bool using ("is_active"::bool);');
  }

}
