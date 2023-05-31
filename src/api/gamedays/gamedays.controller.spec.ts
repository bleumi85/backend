import { Test, TestingModule } from '@nestjs/testing';
import { GamedaysController } from './gamedays.controller';
import { GamedaysService } from './gamedays.service';

describe('GamedaysController', () => {
    let controller: GamedaysController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GamedaysController],
            providers: [GamedaysService],
        }).compile();

        controller = module.get<GamedaysController>(GamedaysController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
