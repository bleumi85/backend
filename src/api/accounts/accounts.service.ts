import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateAccountDto, UpdateAccountDto } from './dto';
import { AccountsRepository } from './accounts.repository';
import { AccountsHelper } from './accounts.helper';
import { Account } from './entities';
import * as bcrypt from 'bcrypt';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class AccountsService {
    constructor(
        private readonly accountsRepo: AccountsRepository,
        private readonly accountsHelper: AccountsHelper,
        private readonly em: EntityManager,
    ) { }

    async create(createAccountDto: CreateAccountDto) {
        const { firstName, lastName, userName, email, password, role } = createAccountDto;

        // check uniqueness of userName / email
        const exists = await this.accountsRepo.count({ $or: [{ email }, { userName }]});

        if (exists > 0) {
            throw new ConflictException(`Email '${email}' or UserName '${userName}' is already registered`)
        }

        const account: Account = new Account(firstName, lastName, userName, email, true, role);
        account.verified = new Date();
        account.passwordHash = await bcrypt.hash(password, 10);

        // save account
        await this.em.persistAndFlush(account);

        return this.accountsHelper.buildAccountRO(account).account;
    }

    async findAll() {
        const accounts = await this.accountsRepo.findAll();
        return accounts.map((account) => this.accountsHelper.buildAccountRO(account).account);
    }

    async findOne(id: string) {
        const account = await this.accountsHelper.getAccount(id);
        return this.accountsHelper.buildAccountRO(account);
    }

    async findOnePayments(id: string) {
        try {
            return await this.accountsRepo.findOneOrFail(id, {
                populate: ['payments.season', 'payments.paymentType'],
                fields: ['id', 'firstName', 'lastName', 'userName']
            })
        } catch {
            throw new NotFoundException('Account not found')
        }
    }

    async findOneSeasons(id: string) {
        try {
            return await this.accountsRepo.findOneOrFail(id, {
                populate: ['seasons'],
                fields: ['id', 'firstName', 'lastName', 'userName'],
            })
        } catch {
            throw new NotFoundException('Account not found')
        }
    }

    async update(id: string, updateAccountDto: UpdateAccountDto) {
        const { firstName, lastName, userName, email, role, password } = updateAccountDto;
        const account = await this.accountsHelper.getAccount(id);

        // validate
        if (account.email !== email && await this.accountsRepo.count({ email })) {
            throw new ConflictException(`Email '${email}' is already registered`)
        }

        if (firstName) account.firstName = firstName;
        if (lastName) account.lastName = lastName;
        if (userName) account.userName = userName;
        if (email) account.email = email;
        if (role) account.role = role;

        // hash password if it was entered
        if (password) {
            account.passwordHash = await bcrypt.hash(password, 10);
        }

        await this.em.persistAndFlush(account);

        return this.accountsHelper.buildAccountRO(account);
    }

    remove(id: number) {
        return `This action removes a #${id} account`;
    }
}
