import { DecimalType, Entity, ManyToOne, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../../accounts/entities';
import { Season } from '../../seasons/entities';
import { PaymentsRepository } from '../payments.repository';
import { PrimaryEntity } from '../../../common/entities';
import { PaymentType } from '../../payment-types/entities';

@Entity({ tableName: 'payments', customRepository: () => PaymentsRepository })
export class Payment extends PrimaryEntity {
    @Property({ type: 'date' })
    @ApiProperty({ description: 'Booking date' })
    booked: Date;

    @Property({ type: 'decimal', precision: 10, scale: 2 })
    @ApiProperty({ description: 'Amount', example: '"123.45"' })
    amount: DecimalType;

    @ManyToOne(() => Account)
    account: Account;

    @ManyToOne(() => Season)
    season: Season;

    @ManyToOne(() => PaymentType)
    paymentType: PaymentType;
}
