import { EntityRepository } from '@mikro-orm/postgresql';
import { Account } from './entities';

export class AccountsRepository extends EntityRepository<Account> {}
