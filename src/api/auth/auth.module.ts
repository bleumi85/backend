import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthHelper } from './auth.helper';
import { JwtModule } from './jwt/jwt.module';
import { Account } from '../accounts/entities';
import { RefreshToken } from '../refresh-tokens/entities';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AccountsHelper } from '../accounts/accounts.helper';

@Module({
    providers: [AuthService, AccountsHelper, AuthHelper, JwtStrategy],
    controllers: [AuthController],
    imports: [PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }), JwtModule, MikroOrmModule.forFeature([Account, RefreshToken])],
})
export class AuthModule {}
