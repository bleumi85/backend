import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { ApiTags } from '@nestjs/swagger';

const name = 'bets';

@ApiTags(name)
@Controller(name)
export class BetsController {
    constructor(private readonly betsService: BetsService) {}

    @Post()
    create(@Body() createBetDto: CreateBetDto) {
        return this.betsService.create(createBetDto);
    }

    @Get()
    findAll() {
        return this.betsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.betsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBetDto: UpdateBetDto) {
        return this.betsService.update(+id, updateBetDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.betsService.remove(+id);
    }
}
