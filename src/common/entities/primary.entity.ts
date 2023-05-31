import { Entity, PrimaryKey } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';

@Entity({ abstract: true })
export class PrimaryEntity {
    @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
    @ApiProperty({ description: 'Unique identifier', format: 'uuid' })
    id: string = v4();
}
