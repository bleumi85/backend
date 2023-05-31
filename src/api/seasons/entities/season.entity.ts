import { Collection, Entity, EntityRepositoryType, ManyToMany, OneToMany, Property } from '@mikro-orm/core';
import { PrimaryEntity } from '../../../common/entities';
import { SeasonsRepository } from '../seasons.repository';
import { Account } from '../../accounts/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Payment } from '../../payments/entities';
import { SeasonPlace } from '../../season-places/entities';
import { SeasonGameday } from '../../season-gamedays/entities';

@Entity({ tableName: 'seasons', customRepository: () => SeasonsRepository })
export class Season extends PrimaryEntity {
    [EntityRepositoryType]?: SeasonsRepository;

    @Property()
    @ApiProperty()
    year: number;

    @Property({ default: false })
    @ApiProperty()
    isActive = false;

    @Property({ persist: false })
    @ApiProperty({ type: 'string' })
    get description() {
        return `1. Bundesliga Saison ${this.year}/${(this.year % 100) + 1}`;
    }

    @ManyToMany(() => Account, (account) => account.seasons)
    accounts = new Collection<Account>(this);

    @OneToMany(() => Payment, (p) => p.season)
    payments = new Collection<Payment>(this);

    @OneToMany(() => SeasonPlace, (sp) => sp.season)
    seasonPlaces = new Collection<SeasonPlace>(this);

    @OneToMany(() => SeasonGameday, (sg) => sg.season)
    seasonGamedays = new Collection<SeasonGameday>(this);
}
