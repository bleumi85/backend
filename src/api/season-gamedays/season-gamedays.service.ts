import { Injectable } from '@nestjs/common';
import { CreateSeasonGamedayDto } from './dto/create-season-gameday.dto';
import { UpdateSeasonGamedayDto } from './dto/update-season-gameday.dto';

@Injectable()
export class SeasonGamedaysService {
  create(createSeasonGamedayDto: CreateSeasonGamedayDto) {
    return 'This action adds a new seasonGameday';
  }

  findAll() {
    return `This action returns all seasonGamedays`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seasonGameday`;
  }

  update(id: number, updateSeasonGamedayDto: UpdateSeasonGamedayDto) {
    return `This action updates a #${id} seasonGameday`;
  }

  remove(id: number) {
    return `This action removes a #${id} seasonGameday`;
  }
}
