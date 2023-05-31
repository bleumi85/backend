import { PartialType } from '@nestjs/swagger';
import { CreateSeasonGamedayDto } from './create-season-gameday.dto';

export class UpdateSeasonGamedayDto extends PartialType(CreateSeasonGamedayDto) {}
