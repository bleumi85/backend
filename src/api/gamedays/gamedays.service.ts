import { Injectable } from '@nestjs/common';
import { CreateGamedayDto } from './dto/create-gameday.dto';
import { UpdateGamedayDto } from './dto/update-gameday.dto';

@Injectable()
export class GamedaysService {
  create(createGamedayDto: CreateGamedayDto) {
    return 'This action adds a new gameday';
  }

  findAll() {
    return `This action returns all gamedays`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gameday`;
  }

  update(id: number, updateGamedayDto: UpdateGamedayDto) {
    return `This action updates a #${id} gameday`;
  }

  remove(id: number) {
    return `This action removes a #${id} gameday`;
  }
}
