import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { Season } from '../../seasons/entities';
import { PrimaryEntity } from '../../../common/entities';

@Entity({ tableName: 'season_places'})
@Unique({ properties: ['season', 'place'], name: 'place_per_season_unqiue'})
export class SeasonPlace extends PrimaryEntity {
    @Property()
    @ApiProperty()
    place: number;

    @Property()
    @ApiProperty()
    percentage: number;

    @ManyToOne(() => Season)
    season: Season;
}