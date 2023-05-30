import { EntityRepository } from '@mikro-orm/postgresql';
import { Season } from './entities';

export class SeasonsRepository extends EntityRepository<Season> {}
