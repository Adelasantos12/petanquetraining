import { Test, TestingModule } from '@nestjs/testing';
import { MerciController } from './merci.controller';

describe('MerciController', () => {
  let controller: MerciController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MerciController],
    }).compile();

    controller = module.get<MerciController>(MerciController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
