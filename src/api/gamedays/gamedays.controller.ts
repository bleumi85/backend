import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GamedaysService } from './gamedays.service';
import { CreateGamedayDto } from './dto/create-gameday.dto';
import { UpdateGamedayDto } from './dto/update-gameday.dto';
import { ApiTags } from '@nestjs/swagger';

const name = 'gamedays';

@Controller(name)
@ApiTags(name)
export class GamedaysController {
    constructor(private readonly gamedaysService: GamedaysService) {}

    @Post()
    create(@Body() createGamedayDto: CreateGamedayDto) {
        return this.gamedaysService.create(createGamedayDto);
    }

    @Get()
    findAll() {
        return this.gamedaysService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.gamedaysService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGamedayDto: UpdateGamedayDto) {
        return this.gamedaysService.update(+id, updateGamedayDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.gamedaysService.remove(+id);
    }
}
