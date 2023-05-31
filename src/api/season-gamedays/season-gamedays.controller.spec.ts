import { Test, TestingModule } from '@nestjs/testing';
import { SeasonGamedaysController } from './season-gamedays.controller';
import { SeasonGamedaysService } from './season-gamedays.service';

describe('SeasonGamedaysController', () => {
  let controller: SeasonGamedaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeasonGamedaysController],
      providers: [SeasonGamedaysService],
    }).compile();

    controller = module.get<SeasonGamedaysController>(SeasonGamedaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
