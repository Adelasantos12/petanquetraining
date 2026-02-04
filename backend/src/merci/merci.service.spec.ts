import { Test, TestingModule } from '@nestjs/testing';
import { MerciService } from './merci.service';

describe('MerciService', () => {
  let service: MerciService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MerciService],
    }).compile();

    service = module.get<MerciService>(MerciService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
