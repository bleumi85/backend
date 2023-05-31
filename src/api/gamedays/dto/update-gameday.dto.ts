import { PartialType } from '@nestjs/swagger';
import { CreateGamedayDto } from './create-gameday.dto';

export class UpdateGamedayDto extends PartialType(CreateGamedayDto) {}
