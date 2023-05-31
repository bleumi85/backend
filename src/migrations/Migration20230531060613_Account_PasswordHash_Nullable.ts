import { Migration } from '@mikro-orm/migrations';

export class Migration20230531060613_Account_PasswordHash_Nullable extends Migration {
    async up(): Promise<void> {
        this.addSql('alter table "accounts" alter column "password_hash" type varchar(255) using ("password_hash"::varchar(255));');
        this.addSql('alter table "accounts" alter column "password_hash" drop not null;');
    }

    async down(): Promise<void> {
        this.addSql('alter table "accounts" alter column "password_hash" type varchar using ("password_hash"::varchar);');
        this.addSql('alter table "accounts" alter column "password_hash" set not null;');
    }
}
