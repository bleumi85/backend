import { EntityRepository } from '@mikro-orm/postgresql';
import { Bet } from './entities';

export class BetsRepository extends EntityRepository<Bet> {}
