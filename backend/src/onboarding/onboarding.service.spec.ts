import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingService } from './onboarding.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlayerProfile } from '../entities/player-profile.entity';
import { Commitment } from '../entities/commitment.entity';
import { User } from '../entities/user.entity';
import { UserStatusService } from '../users/user-status.service';

describe('OnboardingService', () => {
  let service: OnboardingService;

  const mockRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  const mockUserStatusService = {
    transition: jest.fn(),
    updateStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OnboardingService,
        { provide: getRepositoryToken(PlayerProfile), useValue: mockRepository },
        { provide: getRepositoryToken(Commitment), useValue: mockRepository },
        { provide: getRepositoryToken(User), useValue: mockRepository },
        { provide: UserStatusService, useValue: mockUserStatusService },
      ],
    }).compile();

    service = module.get<OnboardingService>(OnboardingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
