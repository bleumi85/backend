import { EntityRepository } from '@mikro-orm/postgresql';
import { Payment } from './entities';

export class PaymentsRepository extends EntityRepository<Payment> {}
