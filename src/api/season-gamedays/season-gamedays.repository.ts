import { EntityRepository } from '@mikro-orm/postgresql';
import { SeasonGameday } from './entities';

export class SeasonGamedaysRepository extends EntityRepository<SeasonGameday> {}
