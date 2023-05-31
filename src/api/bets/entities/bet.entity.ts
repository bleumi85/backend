import { Entity, EntityRepositoryType, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryEntity } from '../../../common/entities';
import { BetsRepository } from '../bets.repository';
import { Account } from '../../accounts/entities';
import { SeasonGameday } from '../../season-gamedays/entities';

@Entity({ tableName: 'bets', customRepository: () => BetsRepository })
@Unique({ properties: ['seasonGameday', 'account'] })
export class Bet extends PrimaryEntity {
    [EntityRepositoryType]?: BetsRepository;

    @Property()
    @ApiProperty()
    points: number;

    @Property()
    @ApiProperty()
    missed: number;

    @Property({ default: false })
    @ApiProperty()
    isMax = false;

    @ManyToOne(() => Account)
    account: Account;

    @ManyToOne(() => SeasonGameday)
    seasonGameday: SeasonGameday;
}
