import { Test, TestingModule } from '@nestjs/testing';
import { GamedaysService } from './gamedays.service';

describe('GamedaysService', () => {
  let service: GamedaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamedaysService],
    }).compile();

    service = module.get<GamedaysService>(GamedaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
