import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Account } from './entities';

@Module({
    controllers: [AccountsController],
    providers: [AccountsService],
    imports: [MikroOrmModule.forFeature([Account])],
})
export class AccountsModule {}
