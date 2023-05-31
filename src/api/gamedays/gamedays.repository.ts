import { EntityRepository } from '@mikro-orm/postgresql';
import { Gameday } from './entities';

export class GamedaysRepository extends EntityRepository<Gameday> {}
