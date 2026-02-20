import { Test, TestingModule } from '@nestjs/testing';
import { CoachService } from './coach.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { PlayerProfile } from '../entities/player-profile.entity';
import { MerciAssessment } from '../entities/merci-assessment.entity';
import { PlayerBlock } from '../entities/player-block.entity';
import { Payment } from '../entities/payment.entity';

describe('CoachService', () => {
  let service: CoachService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoachService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
        { provide: getRepositoryToken(PlayerProfile), useValue: mockRepository },
        { provide: getRepositoryToken(MerciAssessment), useValue: mockRepository },
        { provide: getRepositoryToken(PlayerBlock), useValue: mockRepository },
        { provide: getRepositoryToken(Payment), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<CoachService>(CoachService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
