import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto';
import { AccountsRepository } from '../accounts/accounts.repository';
import { AccountsHelper } from '../accounts/accounts.helper';
import { AuthHelper } from './auth.helper';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class AuthService {
    constructor(
        private readonly accountsRepo: AccountsRepository,
        private readonly accountsHelper: AccountsHelper,
        private readonly authHelper: AuthHelper,
        private readonly em: EntityManager,
    ) {}

    public async login(loginDto: LoginDto, ipAddress: string) {
        const { email, password } = loginDto;
        const account = await this.accountsRepo.findOne({ email });

        if (!account || !account.isVerified || !(await this.authHelper.isPasswordValid(password, account.passwordHash))) {
            throw new UnauthorizedException('Email or password is incorrect');
        }

        // authentication successful so generate jwt and refresh tokens
        const jwtToken = await this.authHelper.generateJwtToken(account);
        const refreshToken = this.authHelper.generateRefreshToken(account, ipAddress);
        this.em.persistAndFlush(refreshToken);

        return {
            ...this.accountsHelper.buildAccountRO(account),
            jwtToken,
            refreshToken: refreshToken.token,
        };
    }
}
