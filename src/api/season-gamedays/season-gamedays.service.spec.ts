import { Test, TestingModule } from '@nestjs/testing';
import { SeasonGamedaysService } from './season-gamedays.service';

describe('SeasonGamedaysService', () => {
  let service: SeasonGamedaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonGamedaysService],
    }).compile();

    service = module.get<SeasonGamedaysService>(SeasonGamedaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
