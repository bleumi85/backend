import { Collection, Entity, EntityRepositoryType, ManyToOne, OneToMany, Property, Unique } from '@mikro-orm/core';
import { SeasonGamedaysRepository } from '../season-gamedays.repository';
import { PrimaryEntity } from '../../../common/entities';
import { Season } from '../../seasons/entities';
import { Gameday } from '../../gamedays/entities';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ tableName: 'seasons_gamedays', customRepository: () => SeasonGamedaysRepository })
@Unique({ properties: ['season', 'gameday'], name: 'seasons_gamedays_always_unique' })
export class SeasonGameday extends PrimaryEntity {
    [EntityRepositoryType]?: SeasonGamedaysRepository;

    @ManyToOne(() => Season)
    season: Season;

    @ManyToOne(() => Gameday)
    gameday: Gameday;

    @Property({ type: 'date', nullable: true })
    @ApiProperty()
    dateStart: Date;

    @Property({ type: 'date', nullable: true })
    @ApiProperty()
    dateEnd: Date;
}
