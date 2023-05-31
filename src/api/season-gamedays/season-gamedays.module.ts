import { Module } from '@nestjs/common';
import { SeasonGamedaysService } from './season-gamedays.service';
import { SeasonGamedaysController } from './season-gamedays.controller';

@Module({
    controllers: [SeasonGamedaysController],
    providers: [SeasonGamedaysService],
})
export class SeasonGamedaysModule {}
