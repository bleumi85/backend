import { Collection, Entity, EntityRepositoryType, OneToMany, Property, Unique } from '@mikro-orm/core';
import { GamedaysRepository } from '../gamedays.repository';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryEntity } from '../../../common/entities';

@Entity({ tableName: 'gamedays', customRepository: () => GamedaysRepository })
export class Gameday extends PrimaryEntity {
    [EntityRepositoryType]?: GamedaysRepository;

    @Property()
    @Unique()
    @ApiProperty()
    title: string;

    @Property()
    @Unique()
    @ApiProperty()
    orderNumber: number;

    @Property({ persist: false })
    @ApiProperty({ type: Boolean })
    get isGameday() {
        return this.title.endsWith('Spieltag')
    }
}
