import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import * as bcrypt from 'bcrypt';
import { Account } from '../api/accounts/entities';
import { AccountsFactory } from '../api/accounts/accounts.factory';
import { Role } from '../api/accounts/accounts.interface';

export class AccountSeeder extends Seeder {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    async run(em: EntityManager): Promise<void> {
        const countAdmin = await em.count(Account, { role: Role.ADMIN });

        if (countAdmin < 1) {
            const admin = em.create(Account, {
                firstName: 'Admin',
                lastName: 'Api',
                userName: 'admin',
                email: 'admin@graftipp.online',
                role: Role.ADMIN,
                passwordHash: await bcrypt.hash('Abcd!2345', 10),
                verified: new Date(Date.UTC(2000, 0, 1)),
                acceptTerms: true,
            });
        }

        let n = Number(process.env.SEED_VISITORS) || 0;
        const countVisitors = await em.count(Account, { role: Role.VISITOR });
        n = n - Math.min(countVisitors, n);
        const accounts = await new AccountsFactory(em).create(n, {
            verified: new Date(Date.UTC(2000, 0, 1)),
            acceptTerms: true,
        });
    }
    /* eslint-enable @typescript-eslint/no-unused-vars */
}
