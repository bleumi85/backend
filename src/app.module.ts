import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from './config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AccountsModule } from './api/accounts/accounts.module';
import { AuthModule } from './api/auth/auth.module';
import { SeasonsModule } from './api/seasons/seasons.module';

@Module({
    imports: [CustomConfigModule, MikroOrmModule.forRoot(), AccountsModule, AuthModule, SeasonsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
