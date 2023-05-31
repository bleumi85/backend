import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './entities';
import { AccountsRepository } from './accounts.repository';
import { Loaded } from '@mikro-orm/core';

@Injectable()
export class AccountsHelper {
    constructor(private readonly accountsRepo: AccountsRepository) {}

    buildAccountRO(account: Account) {
        const accountRO = {
            id: account.id,
            firstName: account.firstName,
            lastName: account.lastName,
            userName: account.userName,
            email: account.email,
            role: account.role,
            isVerified: account.isVerified,
            expirationDate: account.expirationDate,
        };

        return {
            account: accountRO,
        };
    }

    async getAccount(id: string): Promise<Loaded<Account | never>> {
        try {
            return await this.accountsRepo.findOneOrFail(id);
        } catch {
            throw new NotFoundException('Account not found');
        }
    }
}
