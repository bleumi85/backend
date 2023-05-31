import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Account } from './entities';
import { AccountsHelper } from './accounts.helper';
import { AuthHelper } from '../auth/auth.helper';

@Module({
    controllers: [AccountsController],
    providers: [AccountsService, AccountsHelper, AuthHelper],
    imports: [MikroOrmModule.forFeature([Account])],
})
export class AccountsModule {}
