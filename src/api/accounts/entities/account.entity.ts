import { Cascade, Collection, Entity, EntityRepositoryType, Enum, ManyToMany, OneToMany, Property, Unique } from '@mikro-orm/core';
import { DateEntity } from '../../../common/entities';
import { AccountsRepository } from '../accounts.repository';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../accounts.interface';
import { RefreshToken } from '../../refresh-tokens/entities';
import { Season } from '../../seasons/entities';
import { Payment } from '../../payments/entities';
import { Bet } from '../../bets/entities';

@Entity({ tableName: 'accounts', customRepository: () => AccountsRepository })
@Unique({ properties: ['firstName', 'lastName'], name: 'accounts_full_name_unique' })
export class Account extends DateEntity {
    [EntityRepositoryType]?: AccountsRepository;

    @Property()
    @ApiProperty()
    firstName: string;

    @Property()
    @ApiProperty()
    lastName: string;

    @Property()
    @Unique()
    @ApiProperty()
    userName: string;

    @Property()
    @Unique()
    @ApiProperty({ type: 'email' })
    email: string;

    @Enum({ items: () => Role })
    @ApiProperty({ description: `Role is one of [${Object.values(Role).join(', ')}]` })
    role: Role = Role.VISITOR;

    @Property({ columnType: 'date', nullable: true })
    expirationDate: Date;

    @Property({ hidden: true, nullable: true })
    passwordHash: string;

    @Property({ default: false })
    acceptTerms = false;

    @Property({ nullable: true })
    verificationToken: string;

    @Property({ nullable: true })
    verified: Date;

    @Property({ nullable: true })
    resetToken: string;

    @Property({ nullable: true })
    resetTokenExpires: Date;

    @Property({ nullable: true })
    passwordReset: Date;

    @Property({ persist: false })
    @ApiProperty({ type: Boolean })
    get isVerified() {
        return !!(this.verified || this.passwordReset);
    }

    @OneToMany(() => RefreshToken, (rt) => rt.account, { hidden: true, cascade: [Cascade.REMOVE] })
    refreshTokens = new Collection<RefreshToken>(this);

    @ManyToMany(() => Season, 'accounts', { owner: true, orderBy: { year: 'DESC' } })
    seasons = new Collection<Season>(this);

    @OneToMany(() => Payment, (p) => p.account)
    payments = new Collection<Payment>(this);

    @OneToMany(() => Bet, (b) => b.account)
    bets = new Collection<Bet>(this);
}
