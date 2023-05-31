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
    @ApiProperty({ description: 'First Name', example: 'Johnny' })
    firstName: string;

    @Property()
    @ApiProperty({ description: 'Last Name', example: 'Walker' })
    lastName: string;

    @Property()
    @Unique()
    @ApiProperty({ description: 'User Name', example: 'johnny.walker' })
    userName: string;

    @Property()
    @Unique()
    @ApiProperty({ description: 'E-Mail', format: 'email' })
    email: string;

    @Enum({ items: () => Role })
    @ApiProperty({ description: 'Role', enum: Object.values(Role).map((r) => r) })
    role: Role = Role.VISITOR;

    @Property({ type: 'date', nullable: true })
    @ApiProperty({ description: 'Expiration Date', required: false })
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

    constructor(firstName: string, lastName: string, userName: string, email: string, acceptTerms: boolean, role: Role) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.acceptTerms = acceptTerms;
        this.role = role;
    }
}
