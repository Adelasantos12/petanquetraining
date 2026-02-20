import { Test, TestingModule } from '@nestjs/testing';
import { MerciService } from './merci.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MerciAssessment } from '../entities/merci-assessment.entity';

describe('MerciService', () => {
  let service: MerciService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MerciService,
        { provide: getRepositoryToken(MerciAssessment), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<MerciService>(MerciService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
