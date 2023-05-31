import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeasonGamedaysService } from './season-gamedays.service';
import { CreateSeasonGamedayDto } from './dto/create-season-gameday.dto';
import { UpdateSeasonGamedayDto } from './dto/update-season-gameday.dto';
import { ApiTags } from '@nestjs/swagger';

const name = 'season-gamedays'

@ApiTags(name)
@Controller(name)
export class SeasonGamedaysController {
  constructor(private readonly seasonGamedaysService: SeasonGamedaysService) {}

  @Post()
  create(@Body() createSeasonGamedayDto: CreateSeasonGamedayDto) {
    return this.seasonGamedaysService.create(createSeasonGamedayDto);
  }

  @Get()
  findAll() {
    return this.seasonGamedaysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seasonGamedaysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeasonGamedayDto: UpdateSeasonGamedayDto) {
    return this.seasonGamedaysService.update(+id, updateSeasonGamedayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seasonGamedaysService.remove(+id);
  }
}
