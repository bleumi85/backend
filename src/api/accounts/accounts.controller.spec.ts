import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './accounts.repository';

describe('AccountsController', () => {
    let accountsController: AccountsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AccountsController],
            providers: [AccountsService, { provide: AccountsRepository, useFactory: jest.fn(() => ({ flush: jest.fn() })) }],
        }).compile();

        accountsController = module.get<AccountsController>(AccountsController);
    });

    it('should be defined', () => {
        expect(accountsController).toBeDefined();
    });
});
